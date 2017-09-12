import * as _ from 'underscore'

const defaultFocus = "Gene"

export function path(state = [], action) {
  switch (action.type) {
    case 'STEP_ON_PATH':
      var step = {label: action.label, facets: {}}
      var travel = [...state, step]
      // console.log('PATH - STEP_ON_PATH')
      return travel

    case 'SELECTED_FACET':
      var step = _.last(state)
      const facets = {...step.facets, [action.facet.property]: action.facet}
      const onward = {...step, facets: facets}
      var travel = [...state.slice(0, -1), onward]
      // console.log('PATH - SELECTED_FACET')
      return travel

    case 'NEW_QUERY':
      return [{
        label: action.focus,
        facets: {}
      }]

    case 'LOAD_QUERY':
      console.log('load query reducer', action)
      return action.query.path

    default:
      return state
  }
}
