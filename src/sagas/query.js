import { call, put } from 'redux-saga/effects'
import OphionSearch from '../query/search.js'

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
