import * as _ from 'underscore'
import Query from '../query/query'
import {getIn, assocIn, mergeIn, updateIn} from '../state/state'

export function query(state = {}, action) {
  switch (action.type) {
    case 'STEP_ON_PATH':
      if (!state[action.label]) {
        return mergeIn(state, [action.label], {state: 'stepped', facets: {}})
      } else {
        return state
      }
    case 'SELECTED_FACET':
      return assocIn(state, [action.label, 'facets', action.property], action.value)
    case 'QUERY_RESULTS_SAVE':
      return assocIn(state, [action.focus], {
        path: action.path,
        focus: label,
        results: action.results,
        loading: false
      })
    case 'REFRESH_QUERY':
      assocIn(state, [action.focus, 'loading'], true)
    default:
      return state
  }
}

export function comparison(state = {}, action) {
  switch (action.type) {
  case 'QUERY_COMPARISON_SAVE':
    return action.comparison || {}
  default:
    return state
  }
}

export function queries(state = {}, action) {
  switch (action.type) {
    case 'ALL_QUERIES_SAVE':
      return action.queries || {}
    default:
      return state
  }
}

const currentQueryStructure = {
  ['label']: {
    results: [],
    order: 'asc',
    orderBy: 'field',
    queryString: '*',
    parsedQuery: {},
    loading: false,
    selectedFacets: {
      ['facet.key']: {}
    },
    tableSelectedColumns: {
      ['facet.key']: false,
    },
  }
}

export function queryObject(state = [], action) {
  switch (action.type) {
  case 'QUERY_RESULTS_SAVE':
    return action.query.query
  default:
    return state
  }
}

export function currentQuery(state = {name: 'test' }, action) {
  switch (action.type) {

    case 'SEARCH':
      return mergeIn(state, [action.focus], {
        queryString: action.queryString,
        parsedQuery: action.parsedQuery,
      })

    case 'SELECTED_FACET':
      var selectedFacets = state[action.facet.label] ? state[action.facet.label].selectedFacets  : []
      selectedFacets = selectedFacets ? selectedFacets  : []
      selectedFacets = _.filter(selectedFacets, (f) => {return f.key != action.facet.key} )
      selectedFacets.push(action.facet)

      return mergeIn(state, [action.facet.label], {
        currentFacet: action.facet,
        selectedFacets: selectedFacets
      })

    case 'STEP_ON_PATH':
      // run default search when user selects vertex
      const currentQuery = state[action.label] || {}
      return {
        ...state,
        focus: action.label,
        [action.label]: currentQuery
      }

    case 'TOGGLE_IN_TABLE':
      const toggle = function(bit) {return !bit}
      const tableKey = [action.focus, 'tableSelectedColumns', action.facet.key]
      return updateIn(state, tableKey, toggle)

    case 'FILTER_FOR_VALUE':
      return assocIn(state, [action.focus, 'selectedFacets', action.facet.key], action.facet)

    case 'FILTER_OUT_VALUE':
      const filteredFacets = _.omit(state[action.focus].selectedFacets, action.facet.key)
      return assocIn(state, [action.focus, 'selectedFacets'], filteredFacets)

    case 'REFRESH_QUERY':
      return assocIn(state, [action.focus, 'loading'], true)

    case 'QUERY_RESULTS_SAVE':
      // determine default tableFacets see  TOGGLE_IN_TABLE above
      let defaultTableSelectedColumns = {}
      if (action.results && action.results.length > 0) {
        _.each(action.results[0].properties, function(value, key) {
          this[`${action.focus}.${key}`] = true
        }, defaultTableSelectedColumns) ;
      }

      return mergeIn(state, [action.focus], {
        ...action,
        loading: false,
        tableSelectedColumns: defaultTableSelectedColumns
      })

    default:
      return state
  }
}
