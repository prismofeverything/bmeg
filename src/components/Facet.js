import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import classnames from 'classnames';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Card, { CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import List from 'material-ui/List';
import ListItem from 'material-ui/List/ListItem';
import ListItemText from 'material-ui/List/ListItemText';
import ListItemSecondaryAction from 'material-ui/List/ListItemSecondaryAction';
import TextField from 'material-ui/TextField';


import { VictoryPie,VictoryChart,VictoryBar,Bar } from 'victory';

// a `cohort` is a selection from a type/domain/label based on selected criteria
export class Facet extends Component {

  constructor(props) {
    super(props);
    /* initial state */
    this.state = {
      open: false,
    };
    this.toggleOpen = this.toggleOpen.bind(this)
    this.onFacetValuesSelected = this.onFacetValuesSelected.bind(this)
  }

  // when user (un)selects a value
  onFacetValuesSelected(key, values) {
    const { dispatch } = this.props
    const type = this.props.facet.type;
    const property = key.split('.')[1]
    dispatch({
      type: 'SELECTED_FACET',
      facet: {
        label: this.props.label,
        key: key,
        property: property,
        values: values,
        type: type,
      }
    })
  }

  toggleOpen() {
    this.setState({
      open: !this.state.open
    });
  }

  // render the facets
  render() {

    const _self = this ;

    const facet = this.props.facet;
    const key = this.props.property;
    const classes = this.props.classes;


    //  different aggregations have different structures, normalize it for
    //  the chart
    var value_accessor ;
    if (facet.buckets.length  > 0) {
        value_accessor = facet.buckets[0].doc_count ? 'doc_count' : 'value';
    }

    // compose bucket list for the facet
    var buckets = _.map(facet.buckets, function(bucket) {
      return (
            <li key={bucket.key}
              onClick={ () => {
                  if (bucket.doc_count) {
                    _self.onFacetValuesSelected(key, bucket.key)
                  } else {
                    _self.setState({numericInput:  bucket.value })
                  }
                }
              }
              className="list-group-item">
              {bucket.key}
              <span className="badge">{bucket.doc_count ? bucket.doc_count : bucket.value}</span>
            </li>
          );
    });
    // if we have 'remainder', compose 'other' pseudo bucket
    var other;
    if (facet.sum_other_doc_count > 0) {
      other = <li key={'other'} className="list-group-item" ><em>{'other'}</em> <span className="badge">{facet.sum_other_doc_count}</span></li> ;
    }

    // compose chart
    // padding for chart container
    const chartWellStyles = {padding:'0 0 0 0'}
    // char is either pie or chart ( more in future)
    var chart ;
    // input is either numeric text field or null
    var input ;
    if (this.state.open) {
      // percentile aggregation
      if (value_accessor === 'value') {
        input = (
          <TextField
             margin="dense"
             placeholder="123..."
             label="Value"
             helperText="Numeric"
             autoFocus
             className={classes.input}
             onChange={ (event) => {   _self.setState({numericInput:  event.target.value}) } }
             value={_self.state.numericInput}
             onBlur = { (event) => { _self.onFacetValuesSelected(key, event.target.value) } }
             inputProps={{
               'aria-label': 'Description',
             }}
           />
        ) ;

        chart = (
          <VictoryChart domainPadding={20} >
            <VictoryBar
              data={facet.buckets}
              x={(d) => `${d.key}`}
              y={value_accessor}
              colorScale='warm'
              events={[{
                target: "data",
                eventHandlers: {
                  onClick: (evt, clickedProps) => {
                    _self.setState({numericInput: clickedProps.datum.y })
                  },
                }
              }]}
              />
          </VictoryChart>
        )
      } else if (value_accessor === 'doc_count') {
        // terms aggregation
        chart = (
          <VictoryPie data={facet.buckets}
                      x="key"
                      y={value_accessor}
                      colorScale='warm'
                      events={[{
                        target: "data",
                        eventHandlers: {
                          onClick: (evt, clickedProps) => {
                            _self.onFacetValuesSelected(key,
                              clickedProps.datum.x);
                            },
                        }
                      }]}
                      />
        )
      }
      if (!chart) {
        chart = (<p>No values for this query</p>);
      }
      chart = (
        <Paper className="text-center" style={chartWellStyles}>
          {chart}
        </Paper>)
    }


    // all done with this facet, let's render it
    var icon
    if (this.state.open) {
      icon = (<ExpandMoreIcon />)
    } else {
      icon = (<ExpandLessIcon />)
    }

    const facetItem = (
      <div>
        <ListItem dense disableGutters button key={key} onClick={event => _self.toggleOpen()}>
          <ListItemText primary={key}  />
          <ListItemSecondaryAction >
            <IconButton aria-label="More" onClick={event => _self.toggleOpen()}>
              {icon}
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
        <Collapse in={_self.state.open} transitionDuration="auto" unmountOnExit>
          <div>
            <Card>
              <CardContent>
                {input}
                {buckets}
                {other}
                {chart}
              </CardContent>
            </Card>
          </div>
        </Collapse>
      </div>
    );

    return facetItem;
  }
}

function mapStateToProps(state, own) {
  // are any of the selected facets me?
  const selectedFacets =
    _.filter(state.selectedFacets, function(currentFacet) {
      return currentFacet.key && currentFacet.key.startsWith(`${own.property}`);
    });
  // our state
  var selectedFacet;
  if (selectedFacets.length === 1) {
    selectedFacet = selectedFacets[0];
  }
  return {
    selectedFacets: state.selectedFacets,
    selectedFacet: selectedFacet,
  }
}

const styleSheet = createStyleSheet(theme => ({
  card: {
    maxWidth: 400,
  },
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
}));

export default connect(mapStateToProps)(withStyles(styleSheet)(Facet));
