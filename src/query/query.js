import * as _ from 'underscore'

export default class Query {
  static queryComparison(queries) {
    return fetch('/query/compare', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({queries: queries})
    }).then(function(response) {
      return response.json()
    })
  }
}
