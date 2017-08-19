import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import schema from './schema'
import search from './search'
import {queries, currentQuery} from './query'
import {focus, path} from './path'
import FacetReducers from './facets'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  schema: schema,
  search: search,
  focus: focus,
  path: path,
  selectedFacets: FacetReducers.selectedFacets,
  facets: FacetReducers.facets,
  currentFacet: FacetReducers.currentFacet,
  queries: queries,
  currentQuery: currentQuery,
});
