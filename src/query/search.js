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
  // search from main page
  static search(scope, value) {
    const O = Ophion()
    return execute(O.query().searchVertex(value))
      .then(function(results) {
        var groups = groupResults(results)
        console.log('OphionSearch.search results:', results)
        console.log('OphionSearch.search results.length: ' + results.length)
        console.log('OphionSearch.search result types: ' + Object.keys(groups))
        return groups
      }
    )
  }
  // search from cohort
  static facetSearch(action) {
    console.log('OphionSearch.facetSearch action:', action)
    const O = Ophion()
    //selectedFacets: Array(0), label: "Cohort"
    return execute(O.query().searchVertex(action.label))
      .then(function(results) {
        var groups = groupResults(results)
        console.log('OphionSearch.facetSearch results:', results)
        console.log('OphionSearch.facetSearch results.length: ' + results.length)
        console.log('OphionSearch.facetSearch result types: ' + Object.keys(groups))
        return groups
      }
    )
  }
}
