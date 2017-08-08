export default class Facets {

  static fetchFacets() {
    return fetch('/facets')
      .then(function(response) {
        return response.json()
      }
    )
  }

  static aggregateFacets(query) {
    return fetch(`/facets?q=${query}`)
      .then(function(response) {
        return response.json()
      }
    )
  }
}
