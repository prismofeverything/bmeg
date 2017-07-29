#!/usr/bin/env python

import os
import argparse
import tornado
import tornado.web
import urllib2
import thread
import threading
import time
import json
import subprocess
import copy

from jinja2 import Template
from tornado.concurrent import Future
from tornado.httpclient import AsyncHTTPClient
from elasticsearch import Elasticsearch
from elasticsearch.client import IndicesClient


TEMPLATE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                            "templates")
SITE_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public")
BASE_DIR = os.path.dirname(os.path.abspath(__file__))


class NoCacheStaticFileHandler(tornado.web.StaticFileHandler):
    def write_error(self, status_code, *args, **kwargs):
        # custom 404 page
        if status_code in [404]:
            self.render('public/index.html')
        else:
            super().write_error(status_code, *args, **kwargs)

    def set_extra_headers(self, path):
        self.set_header("Cache-control", "no-cache")


class ProxyHandler(tornado.web.RequestHandler):
    def initialize(self, url):
        self.url = url

    @tornado.web.asynchronous
    @tornado.gen.engine
    def get(self, path=None):
        """ async GET call to BMEG vertex/query """
        url = self.url
        if path is not None:
            url = url + path
        print "Proxy GET to %s" % url
        http_client = AsyncHTTPClient()
        response = yield http_client.fetch(url)
        if response.error:
            self.write("Error: %s" % response.error)
        else:
            self.write(response.body)
        self.finish()

    @tornado.web.asynchronous
    @tornado.gen.engine
    def post(self, path=None):
        """ async POST call to BMEG vertex/query """
        url = self.url
        if path is not None:
            url = url + path
        payload = self.request.body
        print "Proxy POST to %s request: %s" % (url, payload)
        headers = {'Content-Type': 'application/json',
                   'Accept': 'application/json'}
        http_client = AsyncHTTPClient()
        response = yield http_client.fetch(url, method="POST", body=payload,
                                           headers=headers)
        if response.error:
            self.write("Error: %s" % response.error)
        else:
            self.write(response.body)
        self.finish()


class FacetAggregationHandler(tornado.web.RequestHandler):
    """ handle elastic requests """

    def initialize(self, url, index="animaltree"):
        self.url = url
        self.index = index

    @tornado.gen.coroutine
    def get(self, path=None):
        """ async GET call to ES see http://bit.ly/2rWlBeR """

        @tornado.gen.coroutine
        def _search_elastic():
            """ threadsafe & tornado friendly way to call ES """
            es = Elasticsearch()
            # for explaination, see
            # http://www.tornadoweb.org/en/stable/gen.html#utility-functions
            raise tornado.gen.Return(es.msearch(body=self._aggregation(path)))

        response = yield _search_elastic()
        self.write(response)
        self.finish()

    def _aggregation(self, path=None):
        """ utility, create msearch body from request """
        query_string = self.get_query_argument('q', '*')
        aggs = self.get_query_argument('aggs', None)
        if aggs:
            aggs = aggs.split(',')
        else:
            aggs = []
        body = []
        index = self.index
        size = self.get_query_argument('size', 10)
        # create count aggregation for each field
        for property_name in aggs:
            body.extend(
                [
                    {"index": index,
                     "ignore_unavailable": True, "preference": 1},
                    {
                        "size": 0,
                        "query": {"query_string": {"analyze_wildcard": True,
                                                   "query": query_string}},
                        "aggs": {
                            property_name: {
                                "terms": {
                                    "field": "%s.keyword" % property_name,
                                    "size": size
                                }
                            }
                        }
                    }
                ]
            )
        return body


class FacetHandler(tornado.web.RequestHandler):
    """ handle GET facets  request  """

    def initialize(self, url, index="animaltree"):
        self.url = url
        self.index = index

    @tornado.gen.coroutine
    def get(self, path=None):
        """ async GET call to ES see http://bit.ly/2rWlBeR """

        @tornado.gen.coroutine
        def _get_edges():
            """ get all edges """
            """ threadsafe & tornado friendly way to call ES """
            # for explaination, see
            # http://www.tornadoweb.org/en/stable/gen.html#utility-functions
            es = Elasticsearch()
            raise tornado.gen.Return(
                es.msearch(body=self._edges_aggregation())
            )

        @tornado.gen.coroutine
        def _get_mapping():
            """ get ES mapping (schema) for our index """
            es = Elasticsearch()
            ic = IndicesClient(es)
            raise tornado.gen.Return(
                ic.get_mapping(self.index)
            )

        @tornado.gen.coroutine
        def _get_aggregation(facets):
            """ get default aggregation buckets for all facets """
            es = Elasticsearch()
            raise tornado.gen.Return(
                es.msearch(body=self._aggregation(facets))
            )

        @tornado.gen.coroutine
        def _get_properties(edges_response):
            """ for all edges, get the properties for that edge """
            es = Elasticsearch()
            """ edges_response looks like ...
                {"responses": [{"status": 200,
                "hits": {"hits": [], "total": 69644, "max_score": 0.0},
                "_shards": {"successful": 5, "failed": 0, "total": 5},
                "took": 1,
                "aggregations": {"Labels":
                {"buckets": [{"key": "Gene", "doc_count": 39892},
                    {"key": "Pubmed", "doc_count": 18044},
                    {"key": "Individual", "doc_count": 11036},
                    {"key": "GeneFamily", "doc_count": 589},
                    {"key": "Cohort", "doc_count": 40},
                    {"key": "Project", "doc_count": 33},
                    {"key": "GeneDatabase", "doc_count": 10}]
                }
            """
            if "responses" not in edges_response:
                return None
            edges = edges_response["responses"][0]['aggregations']['Labels']['buckets']  # NOQA
            edge_names = []
            for edge in edges:
                edge_names.append(edge['key'])
            raise tornado.gen.Return(
                es.msearch(body=self._properties(edge_names))
            )

        def _create_facets(properties_response, mapping_response):
            """ create facets from properties and mapping
                returns {'facets': {label.key:{'type':...}}}
            """
            # '.responses[].hits.hits[]._source.properties | keys'
            facets = {}
            for response in properties_response['responses']:
                for hit in response['hits']['hits']:
                    _label = hit['_source']['label']
                    for key in hit['_source']['properties'].keys():
                        facets['{}.{}'.format(_label, key)] = {}
            all_properties = mapping_response[self.index]['mappings']['vertex']['properties']['properties']['properties']  # NOQA
            for aggregation_key in facets:
                _label, _property = aggregation_key.split('.')
                prop = all_properties[_property]
                if 'fields' in prop:
                    del prop['fields']
                facets[aggregation_key] = prop

            return {'facets': facets}

        def _update_facets(facets, aggregation_response):
            """ update facets with aggregation buckets """
            # collect all the aggregation into a simple dict
            aggregations = {}
            for response in aggregation_response['responses']:
                for aggregation_key in response['aggregations'].keys():
                    aggregations[aggregation_key] = \
                        response['aggregations'][aggregation_key]

            # create a copy of facets, with additional props from aggregations
            facets_copy = {'facets': {}}
            for aggregation_key in aggregations.keys():
                s = aggregations[aggregation_key]
                t = copy.deepcopy(facets['facets'][aggregation_key])

                if 'buckets' in s:
                    t['buckets'] = s['buckets']
                    t['sum_other_doc_count'] = s['sum_other_doc_count']
                if 'values' in s:
                    t['buckets'] = s['values']

                facets_copy['facets'][aggregation_key] = t
            return facets_copy

        # `main`
        edges_response = yield _get_edges()
        properties_response = yield _get_properties(edges_response)
        mapping_response = yield _get_mapping()
        facets = _create_facets(properties_response, mapping_response)
        aggregation_response = yield _get_aggregation(facets)
        facets = _update_facets(facets, aggregation_response)
        self.write(facets)
        self.finish()

    def _properties(self, labels):
        """ create the ES search request to get 1 record for each label """
        body = []
        index = self.index
        for label in labels:
            body.extend(
                [
                    {"index": index,
                     "ignore_unavailable": True, "preference": 1},
                    {
                      "version": True,
                      "size": 1,
                      "query": {
                        "bool": {
                          "must": [
                            {
                              "query_string": {
                                "analyze_wildcard": True,
                                "query": "*"
                              }
                            },
                            {
                              "match": {
                                "label": {
                                  "query": label,
                                  "type": "phrase"
                                }
                              }
                            }
                          ]
                        }
                      }
                    }
                ]
            )
        return body

    def _edges_aggregation(self):
        """ search request for list of labels and their document counts """
        query_string = self.get_query_argument('q', '*')
        aggs = self.get_query_argument('aggs', None)
        if aggs:
            aggs = aggs.split(',')
        else:
            aggs = []
        body = []
        index = self.index
        # create count aggregation for each field
        body.extend(
            [
                {"index": index,
                 "ignore_unavailable": True, "preference": 1},
                {
                  "size": 0,
                  "query": {
                    "query_string": {
                      "analyze_wildcard": True,
                      "query": "_type: vertex"
                    }
                  },
                  "_source": {
                    "excludes": []
                  },
                  "aggs": {
                    "Labels": {
                      "terms": {
                        "field": "label.keyword",
                        "size": 9999,
                        "order": {
                          "_count": "desc"
                        }
                      }
                    }
                  }
                }
            ]
        )
        return body

    def _aggregation(self, facets):
        """ for all facets, get default buckets (top 10) """
        body = []
        index = self.index
        size = self.get_query_argument('size', 10)
        # create count aggregation for each field
        for aggregation_key in facets['facets'].keys():
            _label, _property = aggregation_key.split('.')
            property_type = facets['facets'][aggregation_key]['type']
            property_aggregation = {
                "terms": {
                    "field": "properties.%s.keyword" % _property,
                    "size": size
                }
            }
            if (property_type != 'text'):
                property_aggregation = {
                    "percentiles": {
                        "field": "properties.%s" % _property,
                        "keyed": False
                    }
                }
            aggregation = {
                "size": 0,
                "query": {"query_string":
                          {
                            "analyze_wildcard": True,
                            "query": 'label:{}'.format(_label)
                           }
                          },
                "aggs": {
                    '{}.{}'.format(_label, _property): property_aggregation
                }
            }

            body.extend(
                [
                    {"index": index,
                     "ignore_unavailable": True, "preference": 1},
                    aggregation
                ]
            )
        return body


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("main")
    parser.add_argument("--port", type=int, default=8080)
    parser.add_argument("--debug", default=False, action="store_true",
                        help="Turns on autoreload and other debug features")

    args = parser.parse_args()

    application = tornado.web.Application([(r"^/()$",
                                            NoCacheStaticFileHandler,
                                            dict(path=os.path.join(SITE_DIR, "index.html"))),  # NOQA
        # (r"^/static/(.*)", NoCacheStaticFileHandler, dict(path=STATIC_DIR) ),
        (r"^/vertex/query", ProxyHandler,
            dict(url="%s/vertex/query" % args.main)),
        (r"^/schema/protograph", ProxyHandler,
            dict(url="%s/schema/protograph" % args.main)),
        (r"^/vertex/find/(.*)", ProxyHandler,
            dict(url="%s/vertex/find/" % args.main)),
        (r"^/edge/find/(.*)", ProxyHandler,
            dict(url="%s/edge/find/" % args.main)),
        (r"^/search[/]?(.*)", ProxyHandler,
            dict(url="%s/search" % args.main)),
        (r"^/gaia/gene/(.*)/find/(.*)",
            ProxyHandler, dict(url="%s/gaia/vertex/find/" % args.main)),
        (r"^/facets[/]?(.*)",
            FacetHandler, dict(url="%s" % args.main)),
        (r"^/aggregations[/]?(.*)",
            FacetAggregationHandler, dict(url="%s" % args.main)),
        (r"^/(.*)", NoCacheStaticFileHandler,
            dict(path=SITE_DIR, default_filename="index.html")),
        #  (r"^(.*)", ProxyHandler, dict(url=args.main)),
        ],
        debug=args.debug
    )

    application.listen(args.port)
    tornado.ioloop.IOLoop.instance().start()
