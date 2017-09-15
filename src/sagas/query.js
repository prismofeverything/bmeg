import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import OphionSearch from '../query/search'
import Path from '../query/path'
import Query from '../query/query'
import { generateQuery } from '../query/query'
import { getIn, assocIn, mergeIn, updateIn } from '../state/state'

export function* searchAll(action) {
  const results = yield call(OphionSearch.search, action.focus, action.queryString)
  const state = yield select()
  yield put({
    type: 'SEARCH_RESULTS_SAVE',
    search: {
      focus: action.focus,
      parsedQuery: action.parsedQuery,
      results: results,
      queryString: action.queryString,
      parsedQuery: action.parsedQuery,
    }
  })
}

export function* pathQuery(action) {
  if (!_.isEmpty(action.path)) {
    // const query = Path.translateQuery(action.schema, action.path, action.focus, action.order, action.orderBy).limit(10)
    // const results = yield OphionSearch.execute(query)

    const order = {
      by: action.orderBy,
      direction: action.order
    }

    const facets = _.reduce(_.keys(action.currentQuery), function(facets, key) {
      const facet = action.currentQuery[key].selectedFacets
      if (facet) {
        facets[key] = facet
      }
      return facets
    }, {})

    const query = generateQuery(
      action.schema,
      action.focus,
      action.counts,
      facets,
      order,
    ).limit(10)

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
    // selectedFacets: state.selectedFacets,
    supressFacetAggregation: action.supressFacetAggregation,
    focus: action.label,
    path: state.path,
    schema: state.schema,
    counts: state.counts,
    currentQuery: state.currentQuery,
    queryString: action.queryString,
    parsedQuery: action.parsedQuery,
  })
}

export function* newQuery(action) {
  const state = yield select();
  yield put({
    type: 'REFRESH_QUERY',
    focus: action.focus,
    supressFacetAggregation: action.supressFacetAggregation,
    path: [{label: action.focus, facets: []}],
    counts: state.counts,
    schema: state.schema,
    // selectedFacets: [],
  })
}

export function* saveQuery(action) {
  const state = yield select();
  const vertexes = _.keys(state.schema.vertexes)
  const query = action.query.query
  // const current = {...action.query.current}
  // const stripped = _.reduce(vertexes, function(current, vertex) {
  //   if (current[vertex]) {
  //     const between = assocIn(current, [vertex, 'tableSelectedColumns'], undefined)
  //     return assocIn(current, [vertex, 'results'], undefined)
  //     // current[vertex].tableSelectedColumns = undefined
  //   } else {
  //     return current
  //   }
  // }, current)

  const serialized = JSON.stringify(action.query.current)
  const queries = yield call(
    Path.saveQuery,
    {
      ...action.query,
      query: query.slice(0, query.length - 1),
      current: serialized,
      // current: stripped,
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
    focus: action.query.focus,
    path: action.query.path,
    counts: state.counts,
    schema: state.schema,
    currentQuery: JSON.parse(action.query.current),
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
  // yield put({
  //   ...action,
  //   type: 'FACETS_FETCH',
  // })
  yield put({
    ...action,
    type: 'QUERIES_FETCH',
  })
}
