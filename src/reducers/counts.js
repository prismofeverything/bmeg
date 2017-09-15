import * as _ from 'underscore'

export default function counts(state = {}, action) {
  switch (action.type) {
    case 'FACETS_SAVE':
      const counts = _.reduce(_.keys(action.schema.vertexes), function(counts, vertex) {
        const facet = action.facets.facets[vertex + '.label']
        if (facet) {
          counts[vertex] = facet.buckets[0].doc_count
        }
        return counts
      }, {})

      return counts
    default:
      return state
  }
}
