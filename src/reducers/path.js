import * as _ from 'underscore'

export default function path(state = [], action) {
  switch (action.type) {
    case 'STEP_ON_PATH':
      var step = {label: action.label, facets: {}}
      var travel = [...state, step]
      console.log('PATH - STEP_ON_PATH')
      return travel
    case 'SELECTED_FACET':
      var step = _.last(state)
      var facets = {...step.facets, [action.facet.property]: action.facet}
      var onward = {...step, facets: facets}
      var travel = [...state.slice(0, -1), onward]
      console.log('PATH - SELECTED_FACET')
      return travel
    default:
      return state
  }
}
