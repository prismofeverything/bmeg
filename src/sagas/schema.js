import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import Schema from '../query/schema'
import Facets from '../query/facets'

export function* fetchSchema(action) {
  const schema = yield call(Schema.fetchSchema);
  yield put({
    type: 'SCHEMA_SAVE',
    schema: schema,
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
  yield put({type: 'STEP_ON_PATH', label: action.label})
  yield put(push('/cohort/' + action.label))
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
