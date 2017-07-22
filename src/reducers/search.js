export default function search(state = {}, action) {
  switch (action.type) {
    case 'SEARCH_RESULTS_SAVE':
      return {...state, search:
              {...state.search,
               scope: action.scope,
               search: action.search,
               results: action.results}}
    default:
      return state
  }
}
