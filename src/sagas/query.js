import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import OphionSearch from '../query/search'
import Path from '../query/path'
import Query from '../query/query'

export function* searchAll(action) {
  const results = yield call(OphionSearch.search, action.focus, action.queryString)
  const state = yield select();
  yield put({
    type: 'SEARCH_RESULTS_SAVE',
    search: {
      focus: action.focus,
      parsedQuery: action.parsedQuery,
      results: results,
      queryString: action.queryString ,
      parsedQuery: action.parsedQuery ,
    }
  })
}

export function* pathQuery(action) {
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
    supressFacetAggregation: action.supressFacetAggregation,
    label: action.label,
    focus: action.label,
    path: state.path,
    schema: state.schema,
    currentQuery: state.currentQuery,
    queryString: action.queryString,
    parsedQuery: action.parsedQuery,
  })
}

export function* newQuery(action) {
  const state = yield select();
  yield put({
    type: 'REFRESH_QUERY',
    label: action.focus,
    focus: action.focus,
    supressFacetAggregation: action.supressFacetAggregation,
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
  yield put(push('/cohort/' + action.query.focus))
  // yield put({type: 'LOAD_QUERY_SAVE', query: action.query})
  yield put({
    type: 'REFRESH_QUERY',
    supressFacetAggregation: action.supressFacetAggregation,
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
