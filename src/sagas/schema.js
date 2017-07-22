import { call, put } from 'redux-saga/effects'
import Schema from '../query/schema.js'

export function* fetchSchema(action) {
  const schema = yield call(Schema.fetchSchema)
  yield put({
    type: 'SCHEMA_SAVE',
    schema: schema,
  })
}
