import { Ophion } from 'ophion'

export default class Schema {
  static fetchSchema() {
    return fetch('/schema/protograph')
      .then(function(response) {
        return response.json()
      }
    )
  }

  static firstVertex(label) {
    return Ophion()
      .query()
      .has("gid", "type:" + label)
      .outgoing("hasInstance")
      .limit(1)
      .run()
  }

  static fetchVertex(gid) {
    return fetch("/vertex/find/" + gid)
      .then(function(response) {
        return response.json()
      }
    )
  }

  static fetchEdge(from, label, to) {
    return fetch("/edge/find/" + from + '/' + label + '/' + to) 
      .then(function(response) {
        return response.json()
      }
    )
  }
}
