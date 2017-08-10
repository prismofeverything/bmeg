import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';

// tricky import so we don't have a name collision on 'Table'
import { default as TableMD } from 'material-ui/Table';
import { TableBody, TableCell, TableHead, TableRow, TableSortLabel } from 'material-ui/Table';

import Paper from 'material-ui/Paper';


export class Table extends Component {


  constructor(props) {
    super(props);
    /* initial state */
    this.state = {
      order:'asc',
      orderBy: 'gid'
    };
    this.handleRequestSort = this.handleRequestSort.bind(this)
  }

  handleRequestSort(property) {
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const data = this.props.data.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );
    this.setState({ data:data , order:order , orderBy:orderBy });
  };


  // render the table
  render() {
    const _self = this ;
    const classes = this.props.classes;
    if (this.props.data) {
      // map the first item to columns TODO - map from facets
      const columns = _.map(this.props.facets, function(facet, key, list) {
        const property_name = key.split('.')[1];
        return (
          <TableCell
            numeric={facet.type === 'text' ? false: true}
            key={key}>
            <TableSortLabel
               active={_self.state.orderBy === property_name}
               direction={_self.state.order}
               onClick= {(evt, clickedProps) => {
                 _self.handleRequestSort(property_name);
               }}
             >
               {property_name}
             </TableSortLabel>
          </TableCell>
        )
      });

      const rows = _.map(_self.props.data, function(item, index, list) {
        return (
          <TableRow key={item.gid}>
            {
              _.map(_self.props.facets, function(facet, key, list) {
                const property_name = key.split('.')[1];
                return (
                  <TableCell
                    numeric={facet.type === 'text' ? false: true}
                    key={`${item.gid}.${key}`}>
                      {item[property_name]}
                  </TableCell>
                );
              })
            }
          </TableRow>
        );
      });

      return (
        <Paper className={classes.paper}>
          <TableMD>
            <TableHead>
              <TableRow>
                {columns}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </TableMD>
        </Paper>
      ) ;
    } else if (this.props.loading) {
      return (
        <CircularProgress className={classes.progress} />
      )
    } {
      return (
        <div>No active query</div>
      )
    }
  }
}

function mapStateToProps(state, own) {
  console.log('Table mapStateToProps state',state)
  var data;
  if(state.query && state.query[own.label] && !state.query[own.label].loading) {
    data = state.query[own.label].results ? state.query[own.label].results.map(function(result) {return {...result.properties, gid: result.gid}}) : []
  }
  var loading = false;
  if(state.query && state.query[own.label] && state.query[own.label].loading) {
    loading = true;
  }


  // our facets
  const facets =
    _.pick(state.facets, function(value, key, object) {
      return key && key.startsWith(`${own.label}.`);
  });

  return {
    data: data,
    facets: facets,
    loading: loading,
  }
}

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));


export default connect(mapStateToProps)(withStyles(styleSheet)(Table));
