export default function schema(state = {}, action) {
  switch (action.type) {
    // case '@@router/LOCATION_CHANGE':
      
    case 'SCHEMA_SAVE':
      return {...state, schema: {...action.schema, schema: action.schema}}
    case 'VERTEX_SAVE':
      return {...state, vertex: action.vertex, edge: undefined}
    case 'EDGE_SAVE':
      return {...state, edge: action.edge, vertex: undefined}
    default:
      return state
  }
}
