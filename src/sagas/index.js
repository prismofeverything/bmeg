import { takeLatest } from 'redux-saga'
import { fork } from 'redux-saga/effects'
import { fetchSchema } from './schema'
import { searchAll } from './query'

// main saga generators
export function* sagas() {
  yield [
    fork(takeLatest, 'SEARCH_ALL_SUBMIT', searchAll),
    fork(takeLatest, 'SCHEMA_FETCH', fetchSchema),
  ];
}
