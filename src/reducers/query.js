export default function query(state = {}, action) {
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

export function currentQuery(state = {name:'test'}, action) {
  switch (action.type) {
    case 'REFRESH_QUERY':
      return {...state, [action.focus]: {queryString:action.queryString, selectedFacets:action.selectedFacets, order: action.order, orderBy: action.orderBy, loading:true} }
    case 'QUERY_RESULTS_SAVE':
      return {...state, [action.focus]: {...state[action.focus], path: action.path, focus: action.focus, results: action.results, loading:false}}
    default:
      return state
  }
}
