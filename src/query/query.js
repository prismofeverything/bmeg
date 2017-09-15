import * as _ from 'underscore'
import Graph from '../state/graph'

// const schema = {
//   vertexes: {
//     Evidence: {},
//     Pubmed: {},
//   },

//   from: {
//     Evidence: ['evidenceFor', 'genotypeOf', 'phenotypeOf', 'environmentalContextFor']
//   },

//   to: {
//     Pubmed: ['evidenceFor'],
//     Gene: ['genotypeOf'],
//     OntologyTerm: ['phenotypeOf'],
//     Compound: ['environmentalContextFor'],
//   }
// }

// const label = 'Evidence'
// const marks = ['OntologyTerm', 'Gene']

// const facets = {
//   OntologyTerm: {
//     'OT.term': {
//       property: 'term',
//       value: ['good', 'okay']
//     }
//   },

//   genotypeOf: {
//     'gO.symbol': {
//       property: 'symbol',
//       value: ['BRCA1'],
//     }
//   }
// }

// const order = [
//   {property: 'term', order: 'ascending'}
// ]

export function expandSchema(schema) {
  const vertexes = _.keys(schema.vertexes)
  var edges = _.reduce(_.keys(schema.from), function(edges, from) {
    return _.reduce(schema.from[from], function(edges, edge) {
      edges[edge.label] = {from: from}
      return edges
    }, edges)
  }, {})

  edges = _.reduce(_.keys(schema.to), function(edges, to) {
    return _.reduce(schema.to[to], function(edges, edge) {
      edges[edge.label].to = to
      return edges
    }, edges)
  }, edges)

  return {
    vertexes: vertexes,
    edges: edges,
  }
}

export function schemaGraph(schema) {
  const { vertexes, edges } = schema
  var graph = new Graph()

  _.each(vertexes, function(vertex) {
    graph.addVertex(vertex)
  })

  _.each(_.keys(edges), function(edgeLabel) {
    var edge = edges[edgeLabel]
    graph.addVertex(edgeLabel)
    graph.addEdge(edgeLabel, edge.from)
    graph.addEdge(edgeLabel, edge.to)
  })

  return graph
}

export function generateQuery(schema, label, marks, facets, order) {
  var O = Ophion()
  var base = O.query().has('gid', 'type:' + focus).outgoing('hasInstance')
  if (order.by) {
    base.order(order.by, order.direction)
  }
  return base
}

export default class Query {
  static queryComparison(queries) {
    return fetch('/query/compare', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({queries: queries})
    }).then(function(response) {
      return response.json()
    })
  }
}
