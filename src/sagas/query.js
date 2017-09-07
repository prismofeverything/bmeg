import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import OphionSearch from '../query/search'
import Path from '../query/path'
import Query from '../query/query'

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

  if (!_.isEmpty(action.path)) {
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
  const query = action.query.query
  const queries = yield call(
    Path.saveQuery,
    {
      ...action.query,
      query: query.slice(0, query.length - 1)
    },
  )

  yield put({
    type: 'ALL_QUERIES_SAVE',
    queries: queries,
  })
}

export function* loadQuery(action) {
  const state = yield select();
  console.log('load query saga', action.query)
  yield put(push('/cohort/' + action.query.focus))
  // yield put({type: 'LOAD_QUERY_SAVE', query: action.query})
  yield put({
    type: 'REFRESH_QUERY',
    label: action.query.focus,
    focus: action.query.focus,
    path: action.query.path,
    schema: state.schema,
    selectedFacets: [],
  })
}

export function* allQueries(action) {
  const queries = yield call(Path.allQueries)
  yield put({
    type: 'ALL_QUERIES_SAVE',
    queries: queries,
  })
}

export function* queryComparison(action) {
  const comparison = yield Query.queryComparison(action.queries)
  console.log('COMPARISON', comparison)
  yield put({
    type: 'QUERY_COMPARISON_SAVE',
    comparison: comparison,
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
    type: 'QUERIES_FETCH',
  })
}
