import * as _ from 'underscore'

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
      return {...state, sidebarWidth: action.width}
    default:
      return state
  }
}
