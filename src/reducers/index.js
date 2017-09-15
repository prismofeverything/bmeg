import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import schema from './schema'
import { queries, currentQuery, queryObject, comparison, queryState } from './query'
import { path } from './path'
import FacetReducers from './facets'
import plot from './plot'
import counts from './counts'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  schema: schema,
  path: path,
  facets: FacetReducers.facets,
  queryState: queryState,
  queries: queries,
  comparison: comparison,
  currentQuery: currentQuery,
  queryObject: queryObject,
  counts: counts,
  plot: plot,
  autocomplete: FacetReducers.autocomplete,
});
