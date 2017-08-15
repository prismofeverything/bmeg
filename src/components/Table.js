import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import { CircularProgress } from 'material-ui/Progress';
import ReactJson from 'react-json-view-callback'


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
    this.handleJsonCallback = this.handleJsonCallback.bind(this)
  }

  handleJsonCallback(clickEvent) {
    // callback from jsonViewer one of [TOGGLE_IN_TABLE]
    // since the jsonViewer is a separate, external component without knowledge
    // of the label/focus, we recreate the key here using the variable passed
    // from the viewer and our state
    const { dispatch } = this.props
    dispatch({
      type: clickEvent.name,
      label: this.props.label,
      focus: this.props.label,
      facet: {
        key: `${this.props.label}.${clickEvent.variable.name}`,
        property: clickEvent.variable.name,
        values: clickEvent.variable.value,
        type: clickEvent.variable.type,
      }
    })

  }

  handleRequestSort(property) {
    //TODO - remove local sort once server returns sorted data
    const orderBy = property;
    let order = 'desc';
    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc';
    }
    const data = this.props.data.sort(
      (a, b) => (order === 'desc' ? b[orderBy] > a[orderBy] : a[orderBy] > b[orderBy]),
    );

    this.setState({ data:data , order:order , orderBy:orderBy });
    const { dispatch } = this.props
    const cq = this.props.currentQuery;
    const focus = this.props.label;
    dispatch({
      type: 'REFRESH_QUERY',
      selectedFacets: cq[focus].selectedFacets,
      label: focus,
      focus: focus,
      path: cq[focus].path,
      schema: this.props.schema,
      currentQuery: cq[focus].currentQuery,
      queryString: cq[focus].queryString,
      order:order,
      orderBy:orderBy
    })

  };


  // render the table
  render() {
    const _self = this ;
    const classes = this.props.classes;
    if (this.props.data) {
      // map the first item to columns
      const columns = _.map(this.props.tableFacets, function(facet, key, list) {
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
              [<TableCell
                key={`jsonView.${item.gid}`}>
                  <ReactJson
                    src={item}
                    name={item.gid}
                    collapsed
                    indentWidth={2}
                    displayDataTypes={false}
                    displayObjectSize={false}
                    callback={
                    (clickEvent) => {
                      _self.handleJsonCallback(clickEvent);
                    }
                }/>
              </TableCell>].concat(
                _.map(_self.props.tableFacets, function(facet, key, list) {
                  const property_name = key.split('.')[1];
                  return (
                    <TableCell
                      numeric={facet.type === 'text' ? false: true}
                      key={`${item.gid}.${key}`}>
                        {item[property_name]}
                    </TableCell>
                  );
                })
              )
            }
          </TableRow>
        );
      });

      return (
        <Paper className={classes.paper}>
          <TableMD>
            <TableHead>
              <TableRow>
                <TableCell
                  key={'json'}>
                  {'{}'}
                </TableCell>

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

  var data;
  const currentQuery = state.currentQuery;
  if(currentQuery && currentQuery[own.label] && !currentQuery[own.label].loading) {
    data = currentQuery[own.label].results ? currentQuery[own.label].results.map(function(result) {return {...result.properties, gid: result.gid}}) : []
  }
  var loading = false;
  if(currentQuery && currentQuery[own.label] && currentQuery[own.label].loading) {
    loading = true;
  }


  // our facets
  const facets =
    _.pick(state.facets, function(value, key, object) {
      return key && key.startsWith(`${own.label}.`);
  });


  // facets to display in table
  const tableFacets =
    _.pick(facets, function(value, key, object) {
      return key
          && currentQuery[own.label]
          && currentQuery[own.label].tableSelectedColumns
          && currentQuery[own.label].tableSelectedColumns[key];
  });



  return {
    data: data,
    facets: facets,
    loading: loading,
    currentQuery: currentQuery,
    schema: state.schema,
    tableFacets: tableFacets,
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
