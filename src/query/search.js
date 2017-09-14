import * as _ from 'underscore';
import { Ophion } from 'ophion';

function groupResults(results) {
  if (!results[0]) {
    return {}
  } else {
    return _.groupBy(results, function(r) {return r.label})
  }
}

export default class OphionSearch {
  static execute(query) {
    return new Promise(resolve => query.execute(resolve))
  }

  // search from main page
  static search(focus, value) {
    const O = Ophion()
    return OphionSearch.execute(O.query().searchVertex(value))
      .then(function(results) {
        var groups = groupResults(results)
        // console.log('OphionSearch.search results:', results)
        // console.log('OphionSearch.search results.length: ' + results.length)
        // console.log('OphionSearch.search result types: ' + Object.keys(groups))
        return groups
      }
    )
  }
}
