import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";

import cytoscape from 'cytoscape'
import * as _ from 'underscore'

function schemaToCytoscape(schema) {
  if (_.isEmpty(schema)) {
    return {nodes: [], edges: []}
  } else {
    var nodes = Object.keys(schema['vertexes']).map(function(key) {
      var vertex = schema['vertexes'][key]
      return {data: {id: vertex.gid, name: vertex.label}}
    })

    var edges = _.flatten(Object.keys(schema['from']).map(function(key) {
      return schema['from'][key].map(function(edge) {
        return {data: {source: edge['from'], target: edge['to'], label: edge['label']}}
      })
    }))

    return {
      nodes: nodes,
      edges: edges
    }
  }
}

export class Schema extends Component {
  constructor(props){
    super(props)
    this.renderCytoscape = this.renderCytoscape.bind(this)
    this.schemaPositions = {
      Project: [0.0, 0.5],
      Individual: [0.15, 0.5],
      Cohort: [0.15, 0.3],
      Biosample: [0.3, 0.5],
      GeneExpression: [0.5, 0.2],
      Variant: [0.5, 0.35],
      CNASegment: [0.5, 0.5],
      Compound: [0.5, 0.65],
      Predictor: [0.5, 0.8],
      OntologyTerm: [0.5, 0.95],
      LinearSignature: [0.65, 0.75],
      PhenotypeInstance: [0.65, 0.9],
      Gene: [0.7, 0.5],
      GeneDatabase: [0.85, 0.35],
      Pubmed: [0.85, 0.5],
      GeneFamily: [0.85, 0.65],
    }
  }

  calculatePositions(width, height) {
    var self = this;
    return Object.keys(this.schemaPositions).reduce(function(positions, key) {
      var ratio = self.schemaPositions[key]
      if (ratio) {
        positions[key] = {x: ratio[0] * width, y: ratio[1] * height}
      } else {
        positions[key] = {x: 100, y: 100}
      }
      return positions
    }, {})
  }

  renderCytoscape(schema) {
    console.log('rendering schema')
    var nodeColor = '#594346'
    var nodeText = '#ffffff'
    var edgeColor = '#f22f08'
    var edgeText = '#ffffff'
    const {dispatch, width, height} = this.props

    console.log(this.props)
    var radius = Math.min(width, height) * 0.08;

    var cyelement = this.refs.cytoscape
    this.cy = cytoscape({
      container: cyelement,
      boxSelectionEnabled: false,
      autounselectify: true,
      userZoomingEnabled: false,
      userPanningEnabled: false,
      
      style: cytoscape.stylesheet()
        .selector('node')
        .css({
          'content': 'data(name)',
          'height': radius, // 80
          'width': radius, // 80
          'background-fit': 'cover',
          'background-color': nodeColor,
          // 'border-color': '#000',
          // 'border-width': 3,
          // 'border-opacity': 0.5,
          // 'shape': 'roundrectangle',
          'color': nodeText,
          'font-family': '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
          'font-size': radius * 0.24, // 24
          'text-outline-color': nodeColor,
          'text-outline-width': radius * 0.03, // 3,
          'text-valign': 'center'
        })

        .selector('edge')
        .css({
          'content': 'data(label)',
          'width': radius * 0.06,
          'edge-text-rotation': 'autorotate',
          'target-arrow-shape': 'triangle',
          'line-color': edgeColor,
          'target-arrow-color': edgeColor,
          'curve-style': 'bezier',
          'color': edgeText,
          'font-size': radius * 0.18, // 18
          'text-outline-color': edgeColor,
          'text-outline-width': radius * 0.02, // 2
        }),

      elements: schema // schemaToCytoscape(schema)
    })

    this.cy.on('tap', 'node', function(cy) {
      const label = this.id()
      console.log(label)
      dispatch({
        type: 'SCHEMA_TAP_VERTEX',
        label: label,
      })
    })

    this.layout = this.cy.makeLayout({
      name: 'preset',
      positions: this.calculatePositions(width, height)
      // animate: true,
      // padding: 30,
      // animationThreshold: 250,
      // refresh: 20
    })

    // this.layout = this.cy.makeLayout({
    //   name: 'cose' // ,
    //   // animate: true,
    //   // padding: 30,
    //   // animationThreshold: 250,
    //   // refresh: 20
    // })
  }

  generateSchema(schema) {
    console.log(schema)
    var next = schemaToCytoscape(schema)
    if (false) { // (this.cy) {
      this.cy.json(next)
    } else {
      this.renderCytoscape(next)
    }

    this.runLayout()
    this.cy.resize()
  }

  componentDidMount() {
    if (this.props.schema) {
      this.generateSchema(this.props.schema)
    }
  }

  shouldComponentUpdate() {
    return false
  }

  componentWillReceiveProps(props) {
    this.generateSchema(props.schema)
  }

  componentDidReceiveProps(props) {
    console.log('schema did receive props')
    this.cy.resize()
  }

  componentWillUnmount() {
    this.cy.destroy()
  }

  runLayout() {
    this.layout.run()
  }

  cytoscape() {
    return this.cy
  }

  render(){
    let containerStyle = {
      height: this.props.height || '100px',
      width: this.props.width || '100px'
    }

    return(
      <div>
        <div id="cy" style={containerStyle} ref="cytoscape" />
      </div>
    )
  }
}

function mapStateToProps(state, own) {
  return {
    schema: state.schema
  }
}
export default connect(mapStateToProps) (Schema)
