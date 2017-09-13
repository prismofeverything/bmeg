export default class Facets {

  static fetchFacets() {
    return fetch('/facets')
      .then(function(response) {
        return response.json()
      }
    )
  }

  static aggregateFacets(query,field=undefined) {
    if (field) {
      field = `&f=${field}`
    } else {
      field = ''
    }
    return fetch(`/facets?q=${query}${field}`)
      .then(function(response) {
        return response.json()
      }
    )
  }
}
