import * as _ from 'underscore'
import Query from '../query/query'

export function query(state = {}, action) {
  switch (action.type) {
    case 'STEP_ON_PATH':
      if (!state[action.label]) {
        return {
          ...state,
          [action.label]: {
            ...state[action.label],
            state: 'stepped',
            facets: {},
          }
        }
      } else {
        return state
      }
    case 'SELECTED_FACET':
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          facets: {
            ...state[action.label].facets,
            [action.property]: action.value,
          }}}
    case 'QUERY_RESULTS_SAVE':
      return {...state, [action.focus]: {path: action.path, focus: label, results: action.results, loading: false}}
    case 'REFRESH_QUERY':
      return {...state, [action.focus]: {loading: true} }
    default:
      return state
  }
}

export function queries(state = {}, action) {
  switch (action.type) {
    case 'ALL_QUERIES':
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
    queryString: 'asdf;lkj',
    loading: false,
    selectedFacets: {
      ['facet.key']: {}
    },
    tableSelectedColumns: {
      ['facet.key']: false,
    },
  }
}

export function currentQuery(state = {name:'test' }, action) {
  switch (action.type) {
    case 'STEP_ON_PATH':
      // run default search when user selects vertex
      const resultsPresent = state[action.label] && state[action.label].results && state[action.label].results.length > 1
      return {
        ...state,
        [action.label]: {
          ...state[action.label],
          runSearch: !resultsPresent
        }
      }

    case 'TOGGLE_IN_TABLE':
      const toggle = !state[action.focus].tableSelectedColumns[action.facet.key]
      return {
        ...state,
        [action.focus]: {
          ...state[action.focus],
          tableSelectedColumns:{
            ...state[action.focus].tableSelectedColumns,
            [action.facet.key]: toggle,
          }
        }
      }

    case 'FILTER_FOR_VALUE':
      return {
        ...state,
        [action.focus]: {
          ...state[action.focus],
          selectedFacets: {
            ...state[action.focus].selectedFacets,
            [action.facet.key]: action.facet
          }
        }
      }

    case 'FILTER_OUT_VALUE':
      const filteredFacets = _.omit(state[action.focus].selectedFacets, action.facet.key)
      return {
        ...state,
        [action.focus]: {
          ...state[action.focus],
          selectedFacets:filteredFacets
        }
      }

    case 'REFRESH_QUERY':
      const tableSelectedColumns = state[action.focus] && state[action.focus].tableSelectedColumns ? state[action.focus].tableSelectedColumns : {}
      return {
        ...state,
        [action.focus]: {
          queryString: action.queryString,
          selectedFacets: action.selectedFacets,
          order: action.order,
          orderBy: action.orderBy,
          tableSelectedColumns: tableSelectedColumns,
          loading: true
        }
      }

    // case 'LOAD_QUERY':
    //   console.log('load query reducer', action)
    //   return {
    //     [action.query.focus]: action.query
    //   }

    case 'QUERY_RESULTS_SAVE':
      // determine default tableFacets see  TOGGLE_IN_TABLE above
      let defaultTableSelectedColumns = {}
      if (action.results && action.results.length > 0) {
        _.each(action.results[0].properties, function(value, key) {
          this[`${action.focus}.${key}`] = true
        }, defaultTableSelectedColumns) ;
      }
      return {
        ...state,
        [action.focus]: {
          ...state[action.focus],
          path: action.path,
          query: action.query,
          focus: action.focus,
          results: action.results,
          tableSelectedColumns: defaultTableSelectedColumns,
          loading: false
        }
      }
    default:
      return state
  }
}
