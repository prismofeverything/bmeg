export default function schema(state = {}, action) {
  switch (action.type) {
    case 'SCHEMA_SAVE':
      return {...state, schema: {...action.schema, schema: action.schema}}
    default:
      return state
  }
}
