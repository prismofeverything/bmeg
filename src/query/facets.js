export default class Facets {
  static fetchFacets() {
    return fetch('/facets')
      .then(function(response) {
        return response.json()
      }
    )
  }
}
