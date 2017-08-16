import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import schema from './schema'
import search from './search'
import {query, queries, currentQuery} from './query'
import path from './path'
import FacetReducers from './facets'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  schema: schema,
  search: search,
  path: path,
  selectedFacets: FacetReducers.selectedFacets,
  facets: FacetReducers.facets,
  currentFacet: FacetReducers.currentFacet,
  query: query,
  queries: queries,
  currentQuery: currentQuery,
});
