export default function search(state = {}, action) {
  switch (action.type) {
    // case 'SEARCH_RESULTS_SAVE':
    //   return {...state, ...action.search}
    case 'STEP_ON_PATH':
      return {
        ...state,
        scope: action.label
      }

    default:
      return state
  }
}
