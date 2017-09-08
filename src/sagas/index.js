import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { fetchSchema } from './schema'
import { firstVertex } from './schema'
import { navigateCohort } from './schema'
import { fetchVertex } from './schema'
import { fetchEdge } from './schema'
import { layoutComponents } from './schema'
import { fetchFacets } from './facets'
import { aggregateFacets } from './facets'
import { selectFacet } from './facets'
import { startup } from './query'
import { search } from './query'
import { searchAll } from './query'
import { facetSearch } from './query'
import { pathQuery } from './query'
import { newQuery } from './query'
import { saveQuery } from './query'
import { loadQuery } from './query'
import { queryComparison } from './query'
import { allQueries } from './query'

export function* sagas() {
  yield [
    fork(takeLatest, 'STARTUP', startup),
    fork(takeLatest, 'SCHEMA_FETCH', fetchSchema),
    fork(takeLatest, 'FACETS_FETCH', fetchFacets),
    fork(takeLatest, 'QUERIES_FETCH', allQueries),
    fork(takeLatest, 'VERTEX_FETCH', fetchVertex),
    fork(takeLatest, 'EDGE_FETCH', fetchEdge),
    fork(takeLatest, 'SCHEMA_TAP_VERTEX', navigateCohort),
    fork(takeLatest, 'SCHEMA_TAP_EDGE', navigateCohort),
    fork(takeLatest, 'REFRESH_QUERY', pathQuery),
    fork(takeLatest, 'REFRESH_QUERY', aggregateFacets),
    fork(takeLatest, 'SELECT_FACET', selectFacet),
    fork(takeLatest, 'SEARCH', search),
    fork(takeLatest, 'SEARCH_ALL_SUBMIT', searchAll),
    fork(takeLatest, 'NEW_QUERY', newQuery),
    fork(takeLatest, 'SAVE_QUERY', saveQuery),
    fork(takeLatest, 'LOAD_QUERY', loadQuery),
    fork(takeLatest, 'QUERY_COMPARISON', queryComparison),
  ];
}
