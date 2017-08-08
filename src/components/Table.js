import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table';
import Paper from 'material-ui/Paper';


export class Table extends Component {


  constructor(props) {
    super(props);
    /* initial state */
    this.state = { };
  }


  // render the table
  render() {
    const classes = this.props.classes;
    if (this.props.data) {
      // map the first item to columns TODO - map from facets
      const columns = _.map(this.props.data[0], function(item, key, object) {
        return (
          <TableCell
            key={key}>
              {key}
          </TableCell>
        )
      });

      const rows = _.map(this.props.data, function(item, index, list) {
        return (
          <TableRow key={item.gid}>
            {
              const rowCells = _.map(item, function(row, key, obj) {
                return (
                  <TableCell>
                    {row[key]}
                  </TableCell>
                );
              });
            }
          </TableRow>
        );
      }
      {data.map(n => {
        return (
          <TableRow key={n.id}>
            <TableCell>
              {n.name}
            </TableCell>
            <TableCell numeric>
              {n.calories}
            </TableCell>
            <TableCell numeric>
              {n.fat}
            </TableCell>
            <TableCell numeric>
              {n.carbs}
            </TableCell>
            <TableCell numeric>
              {n.protein}
            </TableCell>
          </TableRow>
        );
      })}

      return (
        <Paper className={this.classes.paper}>
          <Table>
            <TableHead>
              <TableRow>
                {columns}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows}
            </TableBody>
          </Table>
        </Paper>
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
  const data = state.query.results ? state.query.results.map(function(result) {return {...result.properties, gid: result.gid}}) : []
  return {
    data: data,
  }
}

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
}));


export default connect(mapStateToProps) (Table)
