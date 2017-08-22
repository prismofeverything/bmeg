import { call, put, select } from 'redux-saga/effects'
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

export function* pathQuery(action) {
  console.log('path query saga')
  console.log(action.path)

  const query = Path.translateQuery(action.schema, action.path, action.focus, action.order, action.orderBy).limit(10)
  const results = yield OphionSearch.execute(query)
  yield put({
    type: 'QUERY_RESULTS_SAVE',
    path: action.path,
    query: query,
    focus: action.focus,
    results: results,
    currentQuery: action.currentQuery,
  })
}

export function* search(action) {
  const state = yield select();
  // get updated aggregations
  yield put({
    type: 'REFRESH_QUERY',
    selectedFacets: state.selectedFacets,
    label: action.label,
    focus: action.label,
    path: state.path,
    schema: state.schema,
    currentQuery: state.currentQuery,
    queryString: action.queryString ? action.queryString : state.queryString,
  })
  // get updated data
  yield put({
    type: 'FACETS_SEARCH',
    selectedFacets: state.selectedFacets,
    label: action.label,
    focus: action.label,
  });
}

export function* newQuery(action) {
  const state = yield select();
  yield put({
    type: 'REFRESH_QUERY',
    label: action.focus,
    focus: action.focus,
    path: [{label: action.focus, facets: []}],
    schema: state.schema,
    selectedFacets: [],
  })
}

export function* saveQuery(action) {
  const queries = yield call(
    Path.saveQuery,
    action.query,
    // action.user,
    // action.key,
    // action.focus,
    // action.path,
    // action.query,
  )

  yield put({
    type: 'ALL_QUERIES',
    queries: queries,
  })
}

export function* loadQuery(action) {
  const state = yield select();
  const query = state.queries[action.focus][action.key]
  console.log(query)
}

export function* allQueries(action) {
  const queries = yield call(Path.allQueries)
  yield put({
    type: 'ALL_QUERIES',
    queries: queries,
  })
}

export function* startup(action) {
  yield put({
    ...action,
    type: 'SCHEMA_FETCH',
  })
  yield put({
    ...action,
    type: 'FACETS_FETCH',
  })
  yield put({
    ...action,
    type: 'ALL_QUERIES_FETCH',
  })
}
