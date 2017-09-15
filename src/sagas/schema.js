import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import Schema from '../query/schema'
import Facets from '../query/facets'

export function* fetchSchema(action) {
  const schema = yield call(Schema.fetchSchema)
  // const facets = yield call(Facets.fetchFacets)

  yield put({
    type: 'SCHEMA_SAVE',
    schema: schema,
  })

  yield put({
    type: 'FETCH_FACETS',
    schema: schema,
  })

  // run default search
  yield put({
    ...action,
    type: 'SEARCH',
  })
}

export function* firstVertex(action) {
  const results = yield call(Schema.firstVertex, action.label)
  const vertex = results[0]

  if (!_.isEmpty(vertex)) {
    yield put(push('/explore/vertex/' + vertex.gid))
  }
}

export function* navigateCohort(action) {
  yield put.resolve({type: 'STEP_ON_PATH', label: action.label})
  yield put.resolve(push('/cohort/' + action.label))
  const state = yield select();
  if (state.currentQuery[action.label].runSearch) {
    yield put({...action, type: 'SEARCH'})
  }
}

export function* fetchVertex(action) {
  const vertex = yield call(Schema.fetchVertex, action.gid)
  if (!_.isEmpty(vertex)) {
    yield put({
      type: 'VERTEX_SAVE',
      vertex: vertex,
    })
  }
}

export function* fetchEdge(action) {
  const edge = yield call(Schema.fetchEdge, action.from, action.label, action.to)
  if (!_.isEmpty(edge)) {
    yield put({
      type: 'EDGE_SAVE',
      edge: edge,
    })
  }
}
