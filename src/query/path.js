import * as _ from 'underscore';
import { Ophion } from 'ophion';

function edgesFor(schema, label) {
  var from = schema.from[label] || []
  var to = schema.to[label] || []
  return from.concat(to)
}

function nodesIn(schema, path) {
  console.log('nodesIn')
  return _.reduce(path, function(nodes, step) {
    var existing = nodes[step.label]
    if (existing) {
      console.log('existing', existing, 'step', step)
      existing.facets = {...existing.facets, ...step.facets}
    } else {
      nodes[step.label] = {...step, edges: edgesFor(schema, step.label)}
    }

    return nodes
  }, {})
}

function applyFacets(query, facets) {
  return _.reduce(_.keys(facets), function(query, key) {
    return query.has(facets[key].property, facets[key].values)
  }, query) || query
}

function findDuplicates(edges) {
  var edgeMap = _.reduce(edges, function(edgeMap, edge) {
    edgeMap[edge.label] = edge
    return edgeMap
  }, {})

  var outcome = _.reduce(edges, function(dup, edge) {
    if (dup[edge.label]) {
      dup[edge.label] += 1
    } else {
      dup[edge.label] = 1
    }
    return dup
  }, {})

  var labels = _.filter(_.keys(outcome), function(label) {return outcome[label] > 1})
  return _.map(labels, function(label) {return edgeMap[label]})
}

function edgeFor(edge, label) {
  return edge.from === label || edge.to === label
}

function otherEnd(edge, label) {
  return edge.from === label ? edge.to : edge.from
}

function addToPaths(paths, labels, edges) {
  console.log('addToPaths', paths, labels, edges)
  return _.reduce(labels, function(paths, label) {
    var edge = _.find(edges, function(edge) {
      return edgeFor(edge, label) && paths[otherEnd(edge, label)]
    })
    paths[label] = edge
    return paths
  }, paths)
}

function arrayEq(a, b) {
  return _.difference(a, b).length === 0 && _.difference(b, a).length === 0
}

function findPaths(focus, labels, edges) {
  console.log('findPaths', focus, labels, edges)
  var paths = {}
  paths[focus] = {label: 'everything'} // {from: focus, to: focus, label: 'everything'}
  var previous = []
  var remaining = _.reject(labels, function(label) {return label === focus})

  while(!_.isEmpty(remaining) && !arrayEq(previous, remaining)) {
    console.log('paths', paths)
    console.log('remaining', remaining)
    previous = remaining
    paths = addToPaths(paths, remaining, edges)
    remaining = _.reject(labels, function(label) {return paths[label]})
  }

  console.log('paths', paths)

  return {
    paths: paths,
    remaining: remaining,
  }
}

function compress(d) {
  return _.reduce(d, function(flat, m) {return flat.concat(m)}, [])
}

function followPaths(paths, edges, label) {
  console.log('followPaths', paths, edges, label)
  var here = _.filter(edges, function(edge) {return edgeFor(edge, label)})
  var there = _.reject(edges, function(edge) {return edgeFor(edge, label)})
  console.log('here', here, 'there', there)
  
  if (_.isEmpty(here)) {
    return [label]
  } else {
    var trees = compress(_.map(here, function(edge) {
      var down = followPaths(paths, there, otherEnd(edge, label))
      return _.map(down, function(path) {
        var direction = {label: edge.label}
        if (edge.from === label) {
          direction.to = edge.to
        } else {
          direction.from = edge.from
        }

        return [label, direction].concat(path)
      })
    }))

    console.log('trees', trees)
    return trees
  }
}

function translateQuery(schema, visited, focus) {
  var nodes = nodesIn(schema, visited)
  var focal = nodes[focus]
  console.log('translate query', focus, visited, focal, nodes)

  if (focal) {
    var O = Ophion()
    var base = O.query().has('gid', 'type:' + focus).outgoing('hasInstance')
    var query = applyFacets(base, focal.facets)
    var labels = _.keys(nodes)
    var allEdges = _.reduce(labels, function(edges, label) {
      return edges.concat(nodes[label].edges)
    }, [])
    var duplicateEdges = findDuplicates(allEdges)
    var paths = findPaths(focus, labels, duplicateEdges)
    var journeys = followPaths(paths.paths, _.values(paths.paths), focus)
    var subqueries = _.map(journeys, function(journey) {
      return _.reduce(journey.slice(1), function(subquery, step) {
        if (step['label']) {
          // it is an edge
          if (step['from']) {
            return subquery.incoming(step['label'])
          } else {
            return subquery.outgoing(step['label'])
          }
        } else {
          // it is a vertex
          return applyFacets(subquery, nodes[step].facets)
        }
      }, O.mark('root'))
    })

    if (!_.isEmpty(subqueries)) {
      query.match(subqueries)
    }

    console.log('query', query)

    return query
  }
}

const ni = nodesIn
const tq = translateQuery

export default class Path {
  static nodesIn(schema, path) {
    return ni(schema, path)
  }

  static translateQuery(schema, visited, focus) {
    return tq(schema, visited, focus)
  }
}

// function outerNodes(paths) {
//   return _.difference(
//     _.keys(paths),
//     _.map(_.values(paths), function(edge) {return edge.target})
//   )
// }

// function followPath(paths, label, seen = []) {
//   console.log('followPath', label)
//   if (paths[label].target === label) {
//     return [paths[label]]
//   } else {
//     return [...followPath(paths, paths[label].target), label]
//   }
// }

// function pathsBack(paths) {
//   var outer = outerNodes(paths)
//   return _.map(outer, function(label) {
//     return _.reverse(followPath(paths, label))
//   })
// }

