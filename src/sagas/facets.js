import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import Facets from '../query/facets'

export function* fetchFacets(action) {
  const facets = yield call(Facets.fetchFacets);
  console.log('fetchFacets',facets)
  yield put({
    type: 'FACETS_SAVE',
    facets: facets
  })
}

export function* aggregateFacets(action) {
  console.log('aggregateFacets.action',action);
  // render a `query` of what's been selected
  const queryString = action.selectedFacets.map(function(selectedFacet){
    const property_name = selectedFacet.key.split('.')[1]
    if (selectedFacet.type === 'text') {
      return `${property_name}:'${selectedFacet.values}'`;
    }
    return `${property_name}:${selectedFacet.values}`;
  }).join(" AND ");

  const aggregatedFacets = yield call(Facets.aggregateFacets,queryString);
  console.log('aggregatedFacets',aggregatedFacets);
  yield put({
    type: 'AGGREGATED_FACETS_SAVE',
    facets: aggregatedFacets,
  })
}
