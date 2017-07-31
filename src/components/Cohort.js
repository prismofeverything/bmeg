import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux"
import { push } from 'react-router-redux'
import * as _ from 'underscore'


import Accordion from 'react-bootstrap/lib/Accordion';
import Panel from 'react-bootstrap/lib/Panel';
import Well from 'react-bootstrap/lib/Well';

import { VictoryPie,VictoryChart,VictoryBar,Bar } from 'victory';

import Sidebar from 'react-sidebar-width'

export class Cohort extends Component {


  render() {
    // create renderable facets
    const facet_items = _.map(this.props.facets, function(value, key, object) {

      // compose bucket lists
      const buckets = _.map(value.buckets, function(bucket) {
        return (
              <li key={bucket.key}
                onClick={() => console.log(key, bucket.key)}
                className="list-group-item">
                {bucket.key}
                <span className="badge">{bucket.doc_count ? bucket.doc_count : bucket.value}</span>
              </li>
            );
      })
      // if we have 'remainder', compose 'other' pseudo bucket
      var other;
      if (value.sum_other_doc_count > 0) {
        other = <li key={'other'} className="list-group-item" ><em>{'other'}</em> <span className="badge">{value.sum_other_doc_count}</span></li> ;
      }

      // compose chart
      const value_accessor = value.buckets[0].doc_count ? 'doc_count' : 'value';
      const chartWellStyles = {padding:'0 25% 0 25%'}
      var chart ;
      if (value_accessor === 'value') {
        chart = (
          <Well className="text-center" style={chartWellStyles}>
            <VictoryChart domainPadding={20} >
              <VictoryBar
                data={value.buckets}
                x={(d) => `${d.key}`}
                y={value_accessor}
                colorScale='warm'
                events={[{
                  target: "data",
                  eventHandlers: {
                    onClick: (evt, clickedProps) => {
                      console.log(key, clickedProps.datum.y);
                    },
                  }
                }]}
                />
            </VictoryChart>
          </Well>
        )
      } else {
        chart = (
          <Well className="text-center" style={chartWellStyles}>
            <VictoryPie data={value.buckets}
                        x="key"
                        y={value_accessor}
                        colorScale='warm'
                        events={[{
                          target: "data",
                          eventHandlers: {
                            onClick: (evt, clickedProps) => {
                              console.log(key, clickedProps.datum.x);
                            },
                          }
                        }]}
                        />
          </Well>
        )
      }

      // all done with this facet
      return (
        <Accordion key={key} bsStyle='accordion-custom'>
            <Panel eventKey={key} header={key} >
              <ol>
                {buckets}
                {other}
              </ol>
              {chart}
            </Panel>
        </Accordion>
      )
    });

    // create warnings if no facets there
    let warnings = null;
    if (facet_items.length < 1) {
        warnings = <h5><span className="label label-warning">No facets found for {this.props.label}</span></h5>;
    }

    const sidebar = (
      <div>
        <div key={this.props.label}>
          {facet_items}
        </div>
        {warnings}
      </div>
    );
    const styles = {
      root: {
        marginTop: '5em',
      }
    }


    // create warnings if no facets there
    return (
      <div>
        <style type="text/css">{`
        .panel-group-accordion-custom {
            margin-bottom: 0;
        }
        `}</style>

        <div className="page-home">
          <Sidebar styles={styles} sidebar={sidebar} open={true} docked={true} sidebarClassName='sidebar-container'>
            <div style={{'width':'100%', 'height':'100%'}} > stuff goes here </div>
          </Sidebar>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state, own) {
  // select the facets that apply to this label
  const my_facets =
    _.pick(state.schema.facets, function(value, key, object) {
      return key.startsWith(`${own.params.label}.`);
    });

  // sort by bucket's 'remainder', if low or 0 then should be good to query on ...
  // var my_facets_sorted =  _.chain(my_facets).sortBy(function(facet, key, object) {
  //   return facet.sum_other_doc_count;
  // }).value();
  const sortKeysBy = function (obj, comparator) {
      var keys = _.sortBy(_.keys(obj), function (key) {
          return comparator ? comparator(obj[key], key) : key;
      });

      return _.object(keys, _.map(keys, function (key) {
          return obj[key];
      }));
  }


  const my_facets_sorted = sortKeysBy(my_facets, function (facet, key) {
      return facet.sum_other_doc_count;
  });

  console.log(my_facets_sorted);

  return {
    label: own.params.label,
    schema: state.schema,
    facets: my_facets_sorted,
  }
}
export default connect(mapStateToProps) (Cohort)
