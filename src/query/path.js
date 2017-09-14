import * as _ from 'underscore';
import { Ophion } from 'ophion';
const O = Ophion()

function edgesFor(schema, label) {
  var from = schema.from[label] || []
  var to = schema.to[label] || []
  return from.concat(to)
}

function nodesIn(schema, path) {
  // console.log('nodesIn')
  return _.reduce(path, function(nodes, step) {
    var existing = nodes[step.label]
    if (existing) {
      // console.log('existing', existing, 'step', step)
      existing.facets = {...existing.facets, ...step.facets}
    } else {
      nodes[step.label] = {...step, edges: edgesFor(schema, step.label)}
    }

    return nodes
  }, {})
}

function applyFacets(query, facets) {
  return _.reduce(_.keys(facets), function(query, key) {
    //TODO - handle single element arrays as a `has`
    if (facets[key].value.length > 1) {
      return query.has(facets[key].property, O.within(facets[key].value))
    } else {
      return query.has(facets[key].property, facets[key].value[0])      
    }
  }, query) || query
}

function findDuplicates(objects, f) {
  var outcome = _.reduce(objects, function(outcome, object) {
    var key = f(object)
    outcome.map[key] = object

    if (outcome.dup[key]) {
      outcome.dup[key] += 1
    } else {
      outcome.dup[key] = 1
    }

    return outcome
  }, {map: {}, dup: {}})

  // console.log('duplicates outcome', outcome)

  var labels = _.filter(_.keys(outcome.dup), function(key) {return outcome.dup[key] > 1})
  return _.map(labels, function(key) {return outcome.map[key]})
}

function edgeFor(edge, label) {
  return edge.from === label || edge.to === label
}

function otherEnd(edge, label) {
  return edge.from === label ? edge.to : edge.from
}

function addToPaths(paths, labels, edges) {
  // console.log('addToPaths', paths, labels, edges)
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
  // console.log('findPaths', focus, labels, edges)
  var paths = {}
  paths[focus] = {label: 'everything'} // {from: focus, to: focus, label: 'everything'}
  var previous = []
  var remaining = _.reject(labels, function(label) {return label === focus})

  while(!_.isEmpty(remaining) && !arrayEq(previous, remaining)) {
    // console.log('paths', paths)
    // console.log('remaining', remaining)
    previous = remaining
    paths = addToPaths(paths, remaining, edges)
    remaining = _.reject(labels, function(label) {return paths[label]})
  }

  // console.log('paths', paths)

  return {
    paths: paths,
    remaining: remaining,
  }
}

function compress(d) {
  return _.reduce(d, function(flat, m) {return flat.concat(m)}, [])
}

function followPaths(paths, edges, label) {
  // console.log('followPaths', paths, edges, label)
  var here = _.filter(edges, function(edge) {return edgeFor(edge, label)})
  var there = _.reject(edges, function(edge) {return edgeFor(edge, label)})
  // console.log('here', here, 'there', there)

  if (_.isEmpty(here)) {
    return [[label]]
  } else {
    var trees = _.map(here, function(edge) {
      var down = followPaths(paths, there, otherEnd(edge, label))
      return _.map(down, function(path) {
        var direction = {label: edge.label}
        if (edge.from === label) {
          direction.to = edge.to
        } else {
          direction.from = edge.from
        }

        return [label, direction].concat(compress(path))
      })
    })

    // console.log('trees', trees)
    return trees
  }
}

function identity(i) {return i}

function translateQuery(schema, visited, focus, order, orderBy) {
  var nodes = nodesIn(schema, visited)
  var focal = nodes[focus]
  // console.log('translate query', focus, visited, focal, nodes, order, orderBy)

  if (focal) {
    var O = Ophion()
    var base = O.query().has('gid', 'type:' + focus).outgoing('hasInstance')
    var query = applyFacets(base, focal.facets)
    var labels = _.keys(nodes)
    var allEdges = _.reduce(labels, function(edges, label) {
      return edges.concat(nodes[label].edges)
    }, [])
    var duplicateEdges = findDuplicates(allEdges, function(edge) {return edge.label})
    var paths = findPaths(focus, labels, duplicateEdges)
    var journeys = _.map(followPaths(paths.paths, _.filter(_.values(paths.paths), identity), focus), compress)
    var relevant = _.filter(journeys, function(journey) {return journey.length > 1})
    var subqueries = _.map(relevant, function(journey) {
      // console.log('journey', journey)
      return _.reduce(journey.slice(1), function(subquery, step) {
        if (step['label']) {
          // it is an edge
          return (step['from']) ? subquery.incoming(step['label']) : subquery.outgoing(step['label'])
        } else {
          // it is a vertex
          return applyFacets(subquery, nodes[step].facets)
        }
      }, O.mark('root'))
    })

    if (!_.isEmpty(subqueries)) {
      query.match(subqueries)
      query.select('root').dedup()
    }

    if (orderBy) {
      var ascending = order !== 'desc'
      query.order(orderBy, ascending)
    }

    // console.log('query', JSON.stringify(query.query))
    return query
  }
}

function saveQuery(query) {
  // console.log('saving query', query)
  return fetch('/query/save', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(query)
  }).then(function(response) {
    // console.log(response)
    return response.json()
  }).catch(function(response) {
    console.log("error saving query", response)
  })
}

function allQueries() {
  return fetch('/query/all', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(function(response) {
    // console.log(response)
    return response.json()
  }).catch(function(response) {
    console.log("error fetching all queries", response)
  })
}

const ni = nodesIn
const tq = translateQuery
const sq = saveQuery
const aq = allQueries

export default class Path {
  static nodesIn(schema, path) {
    return ni(schema, path)
  }

  static translateQuery(schema, visited, focus, order, orderBy) {
    return tq(schema, visited, focus, order, orderBy)
  }

  static saveQuery(user, key, focus, query) {
    return sq(user, key, focus, query)
  }

  static allQueries() {
    return aq()
  }
}


