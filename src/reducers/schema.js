export default function schema(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA_SAVE':
      return {...state, schema: {...action.schema, schema: action.schema}}
    case 'VERTEX_SAVE':
      return {...state, vertex: action.vertex}
    default:
      return state
  }
}
