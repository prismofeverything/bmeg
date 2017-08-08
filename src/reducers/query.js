export default function query(state = {}, action) {
  switch (action.type) {
    case 'QUERY_RESULTS_SAVE':
      return {...state, path: action.path, focus: action.focus, results: action.results}
    default:
      return state
  }
}
