import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Well from 'react-bootstrap/lib/Well';
import { VictoryPie,VictoryChart,VictoryBar,Bar } from 'victory';

// a `cohort` is a selection from a type/domain/label based on selected criteria
export class Facet extends Component {


  constructor(props) {
    super(props);
    /* initial state */
    this.state = {
      open: false,
    };
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
                  _self.onFacetValuesSelected(key, bucket.doc_count ? bucket.key : bucket.value)
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

    // // double check percentiles, if we ask for percentiles of a field
    // // not present in query subset, we will get NaN
    // if (value_accessor === 'value') {
    //   var good_buckets = _.filter(value.buckets,
    //                               (b)=> { return !(b.value === 'NaN')}
    //                              );
    //   if (good_buckets.length == 0) {
    //     value_accessor = undefined;
    //     buckets = undefined;
    //     other = undefined;
    //   }
    // }

    // compose chart
    // padding for chart container
    const chartWellStyles = {padding:'0 0 0 0'}
    // char is either pie or chart ( more in future)
    var chart ;
    if (this.state.open) {
      // percentile aggregation
      if (value_accessor === 'value') {
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
                    _self.onFacetValuesSelected(key, clickedProps.datum.y);
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
        <Well className="text-center" style={chartWellStyles}>
          {chart}
        </Well>)
    }


    // all done with this facet
    const facetItem = (
      <Accordion key={key}
                 bsStyle='accordion-custom'
                 onSelect={ ()=> _self.toggleOpen()}
                 >
          <Panel eventKey={key} header={key} >
            {buckets}
            {other}
            {chart}
          </Panel>
      </Accordion>
    );


    return facetItem;
  }
}

function mapStateToProps(state, own) {
  // console.log('Facet mapStateToProps state', state);
  // console.log('Facet.mapStateToProps own', own)

  // are any of the selected facets me?
  const selectedFacets =
    _.filter(state.selectedFacets, function(currentFacet) {
      return currentFacet.key && currentFacet.key.startsWith(`${own.property}`);
    });
  // our state
  var selectedFacet;
  if (selectedFacets.length === 1) {
    selectedFacet = selectedFacets[0];
    console.log('Facet.mapStateToProps selectedFacet', selectedFacet)
  }
  return {
    selectedFacets: state.selectedFacets,
    selectedFacet: selectedFacet,
  }
}

export default connect(mapStateToProps) (Facet)
