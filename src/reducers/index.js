import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import schema from './schema'
import search from './search'
import {queries, currentQuery, queryObject, comparison} from './query'
import {path} from './path'
import FacetReducers from './facets'
import plot from './plot'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  schema: schema,
  search: search,
  path: path,
  // selectedFacets: FacetReducers.selectedFacets,
  facets: FacetReducers.facets,
  // currentFacet: FacetReducers.currentFacet,
  queries: queries,
  comparison: comparison,
  currentQuery: currentQuery,
  queryObject: queryObject,
  plot: plot,
});
