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
