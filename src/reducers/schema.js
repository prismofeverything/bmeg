export default function schema(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA_SAVE':
      return {...state, ...action.schema}
    case 'VERTEX_SAVE':
      return {...state, vertex: action.vertex, edge: undefined}
    case 'EDGE_SAVE':
      return {...state, edge: action.edge, vertex: undefined}
    default:
      return state
  }
}
