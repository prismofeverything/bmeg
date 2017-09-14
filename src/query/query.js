import * as _ from 'underscore'

const schema = {
  from: {
    Evidence: ['evidenceFor', 'genotypeOf', 'phenotypeOf', 'environmentalContextFor']
  },

  to: {
    Pubmed: ['evidenceFor'],
    Gene: ['genotypeOf'],
    OntologyTerm: ['phenotypeOf'],
    Compound: ['environmentalContextFor'],
  }
}

const label = 'Evidence'
const marks = ['OntologyTerm', 'Gene']

const facets = {
  OntologyTerm: {
    'OT.term': {
      property: 'term',
      value: ['good', 'okay']
    }
  },

  genotypeOf: {
    'gO.symbol': {
      property: 'symbol',
      value: ['BRCA1'],
    }
  }
}

const order = [
  {property: 'term', order: 'ascending'}
]

export function generateQuery(schema, label, marks, facets, order) {
  
}

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
