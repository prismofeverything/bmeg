import * as _ from 'underscore'

export default class Path {
  static nodesIn(path) {
    return _.reduce(path, function(nodes, step) {
      if (!_.isEmpty(step.facets)) {
        nodes[step.label] = step
      }
      return nodes
    }, {})
  }

  static translateQuery(path, focus) {
    
  }
}
