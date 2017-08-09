import * as _ from 'underscore';
import { Ophion } from 'ophion';

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
    console.log('translate query', focus, path)
    const nodes = Path.nodesIn(path)
    const focal = nodes[focus] || {facets: []}
    console.log(focal)

    if (focal) {
      const O = Ophion()
      const query = O.query().has('gid', 'type:' + focus).outgoing('hasInstance')
      return _.reduce(_.keys(focal.facets), function(query, key) {
        console.log(key, facet)
        const facet = focal.facets[key]
        return query.has(facet.property, facet.values)
      }, query) || query
    }
  }
}
