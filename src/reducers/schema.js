export default function schema(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA_SAVE':
      return {...state, ...action.schema}
    case 'VERTEX_SAVE':
      return {...state, vertex: action.vertex}
    case 'EDGE_SAVE':
      return {...state, edge: action.edge}
    case 'LAYOUT_COMPONENTS':
      // TODO - rename action.width to action.sidebarWidth
      // (confusing when there are multiple widths)
      console.log('LAYOUT_COMPONENTS',action.width)
      return {...state, sidebarWidth: action.width}
    case 'STEP_ON_PATH':
      const path = state.path || []
      const step = {label: action.label, facets: {}}
      const travel = [...path, step]
      console.log('STEP_ON_PATH')
      console.log(travel)
      return {...state, path: travel}
    default:
      return state
  }
}
