import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'

import venn from 'venn.js'

export class Venn extends Component {
  constructor(props) {
    super(props)
    this.venn = venn.VennDiagram()
  }

  generateSets(comparison) {
    const compare = {...comparison}
    const intersection = compare['_intersection']
    const keys = _.keys(compare)
    delete compare['_intersection']

    const sets = _.map(keys, function(key) {
      return {sets: [key], size: compare[key]}
    })

    sets.push({sets: keys, size: intersection})
    return sets
  }

  generateDiagram(comparison) {
    const sets = this.generateSets(comparison)
    d3.select(this.element).datum(sets).call(this.venn)
  }

  componentDidMount() {
    if (this.props.comparison) {
      this.generateDiagram(this.props.comparison)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(props) {
    this.generateDiagram(props.comparison)
  }

  componentDidReceiveProps(props) {
    // this.cy.resize()
  }

  componentWillUnmount() {
    // this.cy.destroy()
  }

  render() {
    <div id="venn" ref={element => this.element = element} />
  }
}

function mapStateToProps(state, own) {
  return {
    
  }
}
export default connect(mapStateToProps) (Venn)
