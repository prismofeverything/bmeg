import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'

export class Cohort extends Component {
  render() {
    return (
      <div>animaltree for {this.props.label}</div>
    )
  }
}

function mapStateToProps(state, own) {
  return {
    label: own.params.label,
    schema: state.schema,
    facets: state.facets,
  }
}
export default connect(mapStateToProps) (Cohort)
