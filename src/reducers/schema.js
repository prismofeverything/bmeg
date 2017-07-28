export default function schema(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA_SAVE':
      return {...state, ...action.schema, ...action.facets}
    case 'VERTEX_SAVE':
      return {...state, vertex: action.vertex}
    case 'EDGE_SAVE':
      return {...state, edge: action.edge}
    case 'LAYOUT_COMPONENTS':
      return {...state, sidebarWidth: action.width}
    default:
      return state
  }
}
