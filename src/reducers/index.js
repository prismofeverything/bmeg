import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as formReducer } from 'redux-form';
import schema from './schema'
import search from './search'

// main reducers
export const reducers = combineReducers({
  routing: routerReducer,
  form: formReducer,
  schema: schema,
  search: search,
});
