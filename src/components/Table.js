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
  return {
    data: products
  }
}

export default connect(mapStateToProps) (Table)
