import * as _ from 'underscore'
import Graph from '../state/graph'
import { Ophion } from 'ophion';
const O = Ophion()

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

const indexes = [
  'id',
  'gid',
  'type',
  'refseq',
  'accession',
  'name',
  'tag',
  'term',
  'pmid',
  'symbol',
  'gender',
  'featureId',
  'referenceName',
  'chromosome',
  'start',
  'end',
  'genotype',
  'phenotype',
]

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

function pairs(array) {
  var p = [], l = array.length;
  for(var i = 0; i < l; ++i) {
    for(var j = i + 1; j < l; ++j) {
      p.push([array[i], array[j]])
    }
  }

  return p
}

function applyFacet(query, facet) {
  if (facet.value.length > 1) {
    return query.has(facet.property, O.within(facet.value))
  } else {
    return query.has(facet.property, facet.value[0])      
  }
}

function applyFacets(query, facets) {
  const indexed = _.filter(facets, function(facet) {
    return indexes.indexOf(facet.property) >= 0
  })

  const unindexed = _.reject(facets, function(facet) {
    return indexes.indexOf(facet.property) >= 0
  })

  return _.reduce(indexed.concat(unindexed), applyFacet, query) || query

// function(query, facet) {
//     if (facet.value.length > 1) {
//       return query.has(facet.property, O.within(facet.value))
//     } else {
//       return query.has(facet.property, facet.value[0])      
//     }
//   }, 

}

export function generateQuery(schema, label, counts, facets, order) {
  console.log('generate query', schema, label, facets, order)

  const expand = expandSchema(schema)
  const graph = schemaGraph(expand)
  const involved = _.keys(facets)
  involved.push(label)

  const terminals = pairs(involved)
  const paths = _.map(terminals, function(pair) {
    return graph.pathFromTo(pair[0], pair[1])
  })

  const possible = _.filter(paths, function(path) {
    return _.isEmpty(_.difference(involved, path))
  })

  const ideal = possible.sort(function(a, b) {
    return counts[a[0]] > counts[b[0]] ? -1 : 1
  })

  var path = ideal[0]

  console.log('finding path', expand, graph, involved, terminals, paths, possible, ideal, path)

  if (path && path.length > 1) {
    const step = path[0]
    const isIndexed = _.filter(facets[step] || [], function(facet) {
      return indexes.indexOf(facet.property) >= 0
    }).length > 0

    // const base = (facets[step] && facets[step].length > 0) ? O.query() : O.query().has('gid', 'type:' + step).outgoing('hasInstance')
    const base = isIndexed ? O.query() : O.query().has('gid', 'type:' + step).outgoing('hasInstance')
    var query = applyFacets(base, facets[step])
    if (step === label) {
      query.mark('focus')
    }

    for (var i = 1; i < path.length; i++) {
      const step = path[i]
      if (schema.vertexes[step]) {
        // this is a vertex
        const previous = path[i-1]
        const to = schema.to[step]
        const isIncoming = to ? _.find(to, function(edge) {
          return edge.label === previous
        }) : false

        if (isIncoming) {
          query.inVertex(step)
        } else {
          query.outVertex(step)
        }

        query = applyFacets(query, facets[step])
        if (step === label) {
          query.mark('focus')
        }
      } else {
        // this is an edge
        const previous = path[i-1]
        const from = schema.from[previous]
        const isOutgoing = from ? _.find(from, function(edge) {
          return edge.label === step
        }) : false

        if (isOutgoing) {
          query.outEdge(step)
        } else {
          query.inEdge(step)
        }

        query = applyFacets(query, facets[step])
      }
    }

    query.select('focus').dedup()

    if (order.by) {
      query.order(order.by, order.direction)
    }

    return query
  } else {
    const step = label
    const isIndexed = _.filter(facets[step] || [], function(facet) {
      return indexes.indexOf(facet.property) >= 0
    }).length > 0

    const base = isIndexed ? O.query() : O.query().has('gid', 'type:' + step).outgoing('hasInstance')
    var query = applyFacets(base, facets[step])
    // const base = O.query().has('gid', 'type:' + label).outgoing('hasInstance')
    // var query = applyFacets(base, facets[label])

    if (order.by) {
      query.order(order.by, order.direction)
    }

    return query
  }
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
