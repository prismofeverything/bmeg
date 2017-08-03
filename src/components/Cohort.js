import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as _ from 'underscore'
import Facet from './facet'


import Button from 'react-bootstrap/lib/Button';
import Sidebar from 'react-sidebar-width'

// a `cohort` is a selection from a type/domain/label based on selected criteria
export class Cohort extends Component {

  // when user hits query button
  onQuery() {
    const { dispatch } = this.props
    dispatch({
      type: 'FACETS_AGGREGATE',
      selectedFacets: this.props.selectedFacets,
      label: this.props.label,
    })
  }


  // render all facets
  render() {

    const _self = this ;
    //map all facets
    const facetItems = _.map(_self.props.facets, function(facet, key, object) {
      // all done with this facet
      return (
        <Facet
          label={_self.props.label}
          key={key}
          property={key}
          facet={facet}/>
      )
    });

    // create warnings if no facets there
    let warnings = null;
    if (facetItems.length < 1) {
        warnings = <h5><span className="label label-warning">No facets found for {this.props.label}</span></h5>;
    }

    const sidebarContent = (
      <div>
        <div key={this.props.label}>
          {facetItems}
        </div>
        {warnings}
      </div>
    );
    const sidebarStyles = {
      root: {
        marginTop: '5em',
      }
    }

    // render a `query` of what's been selected
    const queryString = this.props.selectedFacets.map(function(selectedFacet){
        const type = _self.props.facets[selectedFacet.key].type;
        if (type === 'text') {
          return `${selectedFacet.key}: '${selectedFacet.values}'`;
        }
        return `${selectedFacet.key}: ${selectedFacet.values}`;
    }).join(" AND ");

    // render main content
    const queryButton  = (<Button onClick={ () => _self.onQuery() }
                                  >Refresh</Button>);

    const mainContent = (
      <div>
        <p>{queryString}</p>
        {queryButton}
      </div>
    )


    // create warnings if no facets there
    return (
      <div>
        <style type="text/css">{`
        .panel-group-accordion-custom {
            margin-bottom: 0;
        }
        `}</style>

        <div className="page-home">
          <Sidebar styles={sidebarStyles}
                   sidebar={sidebarContent}
                   open={true}
                   docked={true}
                   sidebarClassName='sidebar-container'
                   >
            <div  > {mainContent} </div>
          </Sidebar>
        </div>

      </div>
    )
  }
}

function mapStateToProps(state, own) {
  // select the facets that apply to this label
  console.log('Cohort mapStateToProps', state, own);
  const my_facets =
    _.pick(state.facets, function(value, key, object) {
      return key && key.startsWith(`${own.params.label}.`);
  });

  const sortKeysBy = function (obj, comparator) {
      var keys = _.sortBy(_.keys(obj), function (key) {
          return comparator ? comparator(obj[key], key) : key;
      });
      return _.object(keys, _.map(keys, function (key) {
          return obj[key];
      }));
  }

  // sort by bucket's 'remainder', if low or 0 then should be good to query on ...
  // const sortedFacets = sortKeysBy(my_facets, function (facet, key) {
  //     return facet.sum_other_doc_count;
  // });

  const sortedFacets = sortKeysBy(my_facets, function (facet, key) {
      return key
  });

  // are any of the selected facets ours?
  const selectedFacets =
    _.filter(state.selectedFacets, function(currentFacet) {
      return currentFacet.key && currentFacet.key.startsWith(`${own.params.label}.`);
    });
  // our state
  return {
    label: own.params.label,
    schema: state.schema,
    facets: sortedFacets,
    selectedFacets: selectedFacets,
  }
}

export default connect(mapStateToProps) (Cohort)
