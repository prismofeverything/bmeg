import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'

export class Cohort extends Component {

  render() {
    // create renderable facets
    const facet_items = _.map(this.props.facets, function(value, key, object) {
      const buckets = _.map(value.buckets, function(bucket) {
        return <li key={bucket.key}>{bucket.key} <span className="badge">{bucket.doc_count}</span></li>;
      })
      const other = <li key={'other'}><em>{'other'}</em> <span className="badge">{value.sum_other_doc_count}</span></li> ;
      return (
        <li key={key}>
            {key}:
            <ol>
              {buckets}
              {other}
            </ol>
        </li>
      )
    });
    // create warnings
    let warnings = null;
    if (facet_items.length < 1) {
        warnings = <h5><span className="label label-warning">No facets found for {this.props.label}</span></h5>;
    }

    return (
      <div>
        <h3 className="well">Facets for {this.props.label}</h3>
        <ol>
          {facet_items}
        </ol>
        {warnings}
      </div>
    )
  }
}

function mapStateToProps(state, own) {
  // select the facets that apply to this label
  const my_facets =
    _.pick(state.schema.facets, function(value, key, object) {
      return key.startsWith(`${own.params.label}.`);
    });

  return {
    label: own.params.label,
    schema: state.schema,
    facets: my_facets,
  }
}
export default connect(mapStateToProps) (Cohort)
