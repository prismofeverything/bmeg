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
        response = yield http_client.fetch(url, method="POST", body=payload, request_timeout=60,
                                           headers=headers)
        if response.error:
            self.write("Error: %s" % response.error)
        else:
            self.write(response.body)
        self.finish()


class FacetHandler(tornado.web.RequestHandler):
    """ handle GET facets  request  """

    def initialize(self, url, index="pentomino"):
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
            es = Elasticsearch(args.elastic_hosts)
            raise tornado.gen.Return(
                es.msearch(body=self._edges_aggregation())
            )

        @tornado.gen.coroutine
        def _get_aggregation(facets):
            """ get default aggregation buckets for all facets """
            es = Elasticsearch(args.elastic_hosts)
            body = self._aggregation(facets)
            raise tornado.gen.Return(
                es.msearch(body=body)
            )

        @tornado.gen.coroutine
        def _get_properties(edges_response):
            """ for all edges, get the properties for that edge """
            es = Elasticsearch(args.elastic_hosts)
            ic = IndicesClient(es)
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
            if "responses" not in edges_response or 'aggregations' not in edges_response['responses'][0]:
                return None
            print(edges_response)
            edges = edges_response["responses"][0]['aggregations']['Labels']['buckets']  # NOQA
            edge_names = []
            for edge in edges:
                edge_names.append(edge['key'])
            raise tornado.gen.Return(
                ic.get_mapping(index=self.index, doc_type=edge_names)
            )

        def _create_facets(mapping_response):
            """ create facets from mapping
                returns {'facets': {label.key:{'type':...}}}
            """
            # '.responses[].hits.hits[]._source.properties | keys'
            facets = {}
            if not mapping_response:
                return None
            mappings = mapping_response[self.index]['mappings']
            types = mappings.keys()
            for _type in types:
                mapping = mappings[_type]['properties']
                for _property in mapping.keys():
                    prop = mapping[_property]
                    if 'fields' in prop:
                        del prop['fields']
                    facets['{}.{}'.format(_type, _property)] = prop
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
                # source, target
                s = aggregations[aggregation_key]
                t = copy.deepcopy(facets['facets'][aggregation_key])
                if 'buckets' in s:
                    t['buckets'] = s['buckets']
                    t['sum_other_doc_count'] = s['sum_other_doc_count']
                if 'values' in s:
                    # remove percentiles with all NaN
                    result = list(set([v['value'] for v in s['values']]))
                    if result[0] == 'NaN':
                        t['buckets'] = []
                    else:
                        t['buckets'] = s['values']
                facets_copy['facets'][aggregation_key] = t
            return facets_copy

        # `main`
        edges_response = yield _get_edges()
        mapping_response = yield _get_properties(edges_response)
        facets = _create_facets(mapping_response)
        aggregation_response = yield _get_aggregation(facets)
        facets = _update_facets(facets, aggregation_response)
        self.write(facets)
        self.finish()

    def _edges_aggregation(self):
        """ search request for list of labels and their document counts """
        query_string = self.get_query_argument('q', '*')
        if len(query_string) == 0:
            query_string = '*'
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
                      "query": query_string
                    }
                  },
                  "_source": {
                    "excludes": []
                  },
                  "aggs": {
                    "Labels": {
                      "terms": {
                        "field": "_type",
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
        query_string = self.get_query_argument('q', '*')
        if len(query_string) == 0:
            query_string = '*'

        if not facets:
            return None

        # create count aggregation for each field
        for aggregation_key in facets['facets'].keys():
            _label, _property = aggregation_key.split('.')
            if 'type' not in facets['facets'][aggregation_key]:
                continue
            property_type = facets['facets'][aggregation_key]['type']
            property_aggregation = {
                "terms": {
                    "field": "%s.keyword" % _property,
                    "size": size
                }
            }
            if (property_type != 'text'):
                property_aggregation = {
                    "percentiles": {
                        "field": "%s" % _property,
                        "keyed": False
                    }
                }

            aggregation = {
                "size": 0,
                "query": {"query_string":
                          {
                            "analyze_wildcard": True,
                            "query": 'label:{} AND {}'.format(_label,
                                                              query_string)
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
    parser.add_argument("--elastic_hosts",
                        default=['http://localhost:9200'],
                        help="Array of elastic search hosts see https://elasticsearch-py.readthedocs.io/en/master/#ssl-and-authentication")
    parser.add_argument("--elastic_index",
                        default='pentomino',
                        help="Single index or alias that stores bmeg data")

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
            FacetHandler, dict(url="%s" % args.main,
                               index="%s" % args.elastic_index)),
        (r"^/(.*)", NoCacheStaticFileHandler,
            dict(path=SITE_DIR, default_filename="index.html")),
        #  (r"^(.*)", ProxyHandler, dict(url=args.main)),
        ],
        debug=args.debug
    )

    application.listen(args.port)
    tornado.ioloop.IOLoop.instance().start()
