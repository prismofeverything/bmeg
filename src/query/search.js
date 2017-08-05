import * as _ from 'underscore';
import { Ophion } from 'ophion';

function groupResults(results) {
  if (!results[0]) {
    return {}
  } else {
    return _.groupBy(results, function(r) {return r.label})
  }
}

function execute(query) {
  return new Promise(resolve => query.execute(resolve))
}

export default class OphionSearch {
  static search(scope, value) {
    const O = Ophion()
    return execute(O.query().searchVertex(value))
      .then(function(results) {
        var groups = groupResults(results)
        console.log('results:', results)
        console.log('results.length: ' + results.length)
        console.log('result types: ' + Object.keys(groups))
        return groups
      }
    )
  }
}
