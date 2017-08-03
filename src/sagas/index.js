import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'

import { searchAll } from './query'
import { fetchSchema } from './schema'
import { firstVertex } from './schema'
import { navigateCohort } from './schema'
import { fetchVertex } from './schema'
import { fetchEdge } from './schema'
import { layoutComponents } from './schema'
import { fetchFacets } from './facets'
import { aggregateFacets } from './facets'

export function* sagas() {
  yield [
    fork(takeLatest, 'SEARCH_ALL_SUBMIT', searchAll),
    fork(takeLatest, 'SCHEMA_FETCH', fetchSchema),
    fork(takeLatest, 'SCHEMA_TAP_VERTEX', navigateCohort),
    fork(takeLatest, 'VERTEX_FETCH', fetchVertex),
    fork(takeLatest, 'EDGE_FETCH', fetchEdge),
    fork(takeLatest, 'FACETS_FETCH', fetchFacets),
    fork(takeLatest, 'FACETS_AGGREGATE', aggregateFacets),
  ];
}
