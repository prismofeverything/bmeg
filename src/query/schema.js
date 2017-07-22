export default class Schema {
  static fetchSchema() {
    return fetch('/schema/protograph')
      .then(function(response) {
        return response.json()
      })
  }
}
