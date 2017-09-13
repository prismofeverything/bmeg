import { call, put, select } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import Facets from '../query/facets'


export function* autocomplete(action) {
  // ES names do _not_ have `Type.` prefix, stip it out
  var queryString = action.label.split('.')[1] + ':' + action.value + '*'
  var field = action.label

  const facets = yield call(Facets.aggregateFacets, queryString, field);
  yield put({
    type: 'AUTOCOMPLETE_SAVE',
    facets: facets,
  })
}
