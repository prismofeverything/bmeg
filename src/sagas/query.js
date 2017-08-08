import { call, put } from 'redux-saga/effects'
import OphionSearch from '../query/search.js'
import Path from '../query/path.js'

export function* searchAll(action) {
  const results = yield call(OphionSearch.search, action.scope, action.search)
  yield put({
    type: 'SEARCH_RESULTS_SAVE',
    search: {
      search: action.search,
      scope: action.scope,
      results: results,
    }
  })
}

export function* facetSearch(action) {
  // console.log('query.js facetSearch',action)
  const facetSearchResults = yield call(OphionSearch.facetSearch, action)
  yield put({
    type: 'FACET_SEARCH_RESULTS_SAVE',
    search: {
      label: action.label,
      facetSearchResults: facetSearchResults,
    }
  })
}

export function* pathQuery(action) {
  console.log('path query saga')
  console.log(action.path)

  const query = Path.translateQuery(action.path, action.focus).limit(10)
  const results = yield OphionSearch.execute(query)
  yield put({
    type: 'QUERY_RESULTS_SAVE',
    path: action.path,
    focus: action.focus,
    results: results,
  })
}
