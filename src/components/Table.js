import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export class Table extends Component {


  constructor(props) {
    super(props);
    /* initial state */
    this.state = { };
  }


  // render the table
  render() {

    if (this.props.data) {
    // map the first item to columns
    const columns = _.map(this.props.data[0], function(item, key, object) {
      return (
        <TableHeaderColumn
          dataField={key} >
            {key}
        </TableHeaderColumn>
      )
    });
    // gid is always the key
    return (
      <BootstrapTable data={this.props.data} striped hover keyField='gid'>
        {columns}
      </BootstrapTable>
    ) ;
    } else {
      return (
        <div>no results</div>
      )
    }
  }
}

function mapStateToProps(state, own) {
  console.log('Table mapStateToProps state', state);
  console.log('Table mapStateToProps own', own)
  const products = [{
        gid: 1,
        name: "Product1",
        price: 120
    }, {
        gid: 2,
        name: "Product2",
        price: 80
    }];

  const data = state.query.results ? state.query.results.map(function(result) {return {...result.properties, gid: result.gid}}) : []
  return {
    data: data, //products
  }
}

export default connect(mapStateToProps) (Table)
