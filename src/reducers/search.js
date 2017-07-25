export default function search(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS_SAVE':
      return {...state, ...action.search}
    default:
      return state
  }
}
