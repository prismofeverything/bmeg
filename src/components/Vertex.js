import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import classNames from 'classnames';
import * as _ from 'underscore'

var snipPrefix = function(s) {
  return s.substring(s.indexOf(':') + 1)
}

var VertexEdges = React.createClass({
  getInitialState: function() {
    return {}
  },

  render: function() {
    var props = this.props
    var prefix = (props.edges[0]['in'] || props.edges[0]['out']).split(':')[0]
    var header = <span>{props.label + ' '}<span className="edge-direction">({props.direction} {prefix})</span></span>

    var items = props.edges.map(function(gid) {
      var vertexGid = gid['in'] || gid['out']
      var edgeGid = {from: gid['in'] || props.gid, label: props.label, to: gid['out'] || props.gid};
      return (
        <ExpandoItem key={vertexGid}>
          <a onClick={() => props.navigate(edgeGid)}>{snipPrefix(vertexGid)}</a>
        </ExpandoItem>
      )
    });

    return <Expando header={header}>{items}</Expando>
  }
})

function PropertyRow(props) {
  var value = props.value
  if (_.isArray(value)) {
    value = JSON.stringify(value)
  } else if (_.isObject(value)) {
    value = JSON.stringify(value)
  }

  return (<tr>
          <td className="prop-key mdl-data-table__cell--non-numeric">{props.name}</td>
          <td className="mdl-data-table__cell--non-numeric">{value}</td>
          </tr>)
}

var PropertiesView = function(props) {
  var properties = Object.keys(props.vertex.properties).map(function(key) {
    var v = props.vertex.properties[key]
    return <PropertyRow key={key} name={key} value={v} />
  })

  return (
      <div>
      <div className="vertex-properties">
      <table
    className="prop-table mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shad--2dp"
      ><tbody>
      {properties}
    </tbody></table>
      </div>
      </div>
  )
}

var EdgesView = function(props) {
  var inEdges = Object.keys(props.vertex['in'])
  // Filter out edges with "hasInstance" in label
      .filter(key => key != 'hasInstance')
      .map(function(key) {
        return <VertexEdges
        key={key}
        gid={props.vertex['gid']}
        label={key}
        navigate={props.navigate}
        edges={props.vertex['in'][key]}
        direction="from"
          />
      })

  var outEdges = Object.keys(props.vertex['out'])
  // Filter out edges with "hasInstance" in label
      .filter(key => key != 'hasInstance')
      .map(function(key) {
        return <VertexEdges
        key={key}
        gid={props.vertex['gid']}
        label={key}
        navigate={props.navigate}
        edges={props.vertex['out'][key]}
        direction="to"
          />
      })

  return (
      <div>
      <div className="vertex-edges-wrapper">
      <div className="vertex-in-edges vertex-edges">
      <h4>In Edges</h4>
      {inEdges}
    </div>
      <div className="vertex-out-edges vertex-edges">
      <h4>Out Edges</h4>
      {outEdges}
    </div>
      </div>
      </div>
  )
}

function labelFor(gid) {
  return gid.split(':')[0];
}

var VertexesView = function(props) {
  var from = props.edge['out']
  var to = props.edge['in']

  return (
      <div>
      <div className="vertex-edges-wrapper">
      <div className="vertex-in-edges vertex-edges">
      <h4>from {labelFor(from)}</h4>
      <a onClick={() => props.navigate(from)}>{snipPrefix(from)}</a>
      </div>
      <div className="vertex-out-edges vertex-edges">
      <h4>to {labelFor(to)}</h4>
      <a onClick={() => props.navigate(to)}>{snipPrefix(to)}</a>
      </div>
      </div>
      </div>
  )
}

var VertexInput = React.createClass({
  componentDidMount() {
    componentHandler.upgradeElement(this.refs.mdlWrapper)
    // mdlCleanUp()
  },

  componentDidUpdate() {
    componentHandler.upgradeElement(this.refs.mdlWrapper)
    // mdlCleanUp()
  },

  render() {
    return <div
    className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
    ref="mdlWrapper"
      >
      <label
    className="mdl-textfield__label"
    htmlFor="vertex-gid-input"
      >Enter a vertex GID</label>
      <input
    id="vertex-gid-input"
    type="text"
    name="gid"
    className="mdl-textfield__input"
    onChange={e => this.props.onChange(e.target.value)}
    value={this.props.value}
      />
      </div>
  },
})

var Expando = React.createClass({
  getInitialState() {
    return {
      collapsed: true,
    }
  },
  componentDidMount() {
    var content = document.getElementById(this.refs.content)
    if (content) {
      content.css('margin-top', -content.height())
    }
  },
  onClick() {
    this.setState({collapsed: !this.state.collapsed})
  },
  render() {
    var props = this.props
    var rootClassName = classNames("expando", "mdl-collapse", "mdl-navigation", {
      "mdl-collapse--opened": !this.state.collapsed,
    })

    return (
        <div className={rootClassName}>
        <a className="mdl-navigation__link mdl-collapse__button expando-header" onClick={this.onClick}>
        <i className="material-icons mdl-collapse__icon mdl-animation--default">expand_more</i>
        {props.header}
      </a>
        <div className="mdl-collapse__content-wrapper expando-content">
        <div className="mdl-collapse__content mdl-animation--default" ref="content">
        {props.children}
      </div>
        </div>
        </div>)
  }
})

function ExpandoItem(props) {
  return <span className="mdl-navigation__link">{props.children}</span>
}

function extractLabel(label) {
  var front = label.split(':')[0]
  return front.charAt(0).toUpperCase() + front.slice(1)
}

function fetchEdge(from, label, to, callback) {
  fetch("/edge/find/" + from + '/' + label + '/' + to).then(
    function(response) {
      return response.json()
    }
  ).then(callback)
}

function flatGid(gid) {
  if (gid['from']) {
    return '(' + gid['from'] + ')--' + gid['label'] + '->(' + gid['to'] + ')';
  } else {
    return gid;
  }
}

function viewGid(gid) {
  if (gid['from']) {
    return '(' + snipPrefix(gid['from']) + ')--' + gid['label'] + '->(' + snipPrefix(gid['to']) + ')';
  } else {
    return gid;
  }
}

function extractEdgeGid(gid) {
  var match = gid.match('\\\(([^()]+)\\\)--([^-]+)->\\\(([^()]+)\\\)');
  if (match) {
    return {
      from: match[1],
      label: match[2],
      to: match[3]
    }
  }
}

function makeTitle(vertex) {
  console.log(vertex)
  return <h2>{vertex.label} {snipPrefix(vertex.gid)}</h2>
}

export class VertexViewer extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log('vertex mounting!')
    console.log(this.props)
    const { dispatch, vertex, gid } = this.props
    if (_.isEmpty(vertex)) {
      dispatch({
        type: 'VERTEX_FETCH',
        gid: gid
      })
    }
  }

  setGid() {

  }

  render() {
    var we = this
    if (this.props.vertex) {
      var title = <div>{makeTitle(this.props.vertex)}</div>
      var spacing = <div key="spacing" className="spacing"></div>
      var visualizations = []
      var properties

      if (this.props.vertex.properties) {
        properties = (
          <div>
            <PropertiesView vertex={this.props.vertex} />
            <EdgesView vertex={this.props.vertex} navigate={this.setGid} />
          </div>
        )
      }

      // if (this.props.visualizations) {
      //   var label = this.state.vertex.label || this.state.vertex.properties.label || this.state.vertex.properties['#label'] || this.state.vertex.properties.type || extractLabexl(this.state.vertex.gid)
      //   console.log("label: " + label)
      //   if (this.props.visualizations[label]) {
      //     console.log("visualizations found: " + this.props.visualizations[label].length)
      //     visualizations = visualizations.concat(this.props.visualizations[label].map(function(visualization) {
      //       return visualization(we.state.vertex)
      //     }))
      //   }
      // }
      // }

      return (
        <div id="vertex-container">
        {title}
        {spacing}
        {properties}
        </div>
      )
    } else {
      return <img src="/img/ripple.gif" width="50px" />
    }
  }
}

function mapStateToProps(state, own) {
  return {
    gid: own.params.gid,
    vertex: state.schema.vertex,
  }
}
export default connect(mapStateToProps) (VertexViewer)
