import * as _ from 'underscore'

export function query(state = {}, action) {
  const label = action.focus
  switch (action.type) {
    case 'QUERY_RESULTS_SAVE':
      return {...state, [label]: {path: action.path, focus: action.focus, results: action.results, loading:false}}
    case 'REFRESH_QUERY':
      return {...state, [label]: {loading:true} }
    default:
      return state
  }
}

export function queries(state = {}, action) {
  switch (action.type) {
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

    // case 'NEW_QUERY':
    //   console.log('new query!')
    //   const path = [{label: action.focus, facets: {}}]
    //   return {
    //     ...state,
    //     [action.focus]: {
    //       ...state[action.focus],
    //       path: path,
    //       results: [],
    //       loading: false,
    //     }
    //   }

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
          focus: action.focus,
          results: action.results,
          tableSelectedColumns: defaultTableSelectedColumns,
          loading:false
        }
      }
    default:
      return state
  }
}
