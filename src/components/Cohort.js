import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as _ from 'underscore'

import SplitPane from 'react-flex-split-pane';

import Button from 'react-bootstrap/lib/Button';
import Schema from './Schema'
import Facet from './Facet'
import Table from './Table'

// a `cohort` is a selection from a type/domain/label based on selected criteria
export class Cohort extends Component {

  constructor(props) {
    super(props);
    /* initial state */
    this.state = { sidebarSize: 300,
                   mainSize: 500,
                   isSidebarResizing: false,
                   isMainResizing: false  };
    //TODO - we shouldn't need to do these bindings
    // `() =>` syntax should remove the need for it
    // for some reason, this is a syntax error. is it a webpack config issue?
    this.onSidebarResizeStart = this.onSidebarResizeStart.bind(this)
    this.onSidebarResizeEnd = this.onSidebarResizeEnd.bind(this)
    this.onMainResizeStart = this.onMainResizeStart.bind(this)
    this.onMainResizeEnd = this.onMainResizeEnd.bind(this)
    this.onSidebarChange = this.onSidebarChange.bind(this)
    this.onMainChange = this.onMainChange.bind(this)
  }


  // when user hits query button
  onQuery(queryString) {
    const { dispatch } = this.props
    dispatch({
      type: 'FACETS_AGGREGATE',
      selectedFacets: this.props.selectedFacets,
      label: this.props.label,
    })
    this.triggerSearch(queryString);
  }
  triggerSearch(value) {
    const {dispatch, scope} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'SEARCH_ALL_SUBMIT',
        scope: scope,
        search: value,
        callbackError: (error) => {
          reject({_error: error});
        },
        callbackSuccess: () => {
          resolve();
        }
      });
    });
  }

  // when user resizes splitters
  onSidebarResizeStart() {
    this.setState({ isSidebarResizing: true })
  }
  onSidebarResizeEnd() {
    this.setState({ isSidebarResizing: false })
    // console.log('sidebarSize',this.state.sidebarSize)
    console.log('this.schemaContainer.offsetWidth',this.schemaContainer.offsetWidth)
    console.log('this.schemaContainer.offsetHeight',this.schemaContainer.offsetHeight)
  }
  onSidebarChange(sidebarSize) {
    this.setState({ sidebarSize: sidebarSize })
  }
  onMainResizeStart() {
    this.setState({ isMainResizing: true })
  }
  onMainResizeEnd() {
    this.setState({ isMainResizing: false })
    console.log('mainSize',this.state.mainSize)
  }
  onMainChange(mainSize) {
    this.setState({ mainSize: mainSize })
  }


  // render all facets
  render() {
    const _self = this;
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
      <div >
        <div key={this.props.label} >
          {facetItems}
        </div>
        {warnings}
      </div>
    );

    // render a `query` of what's been selected
    const queryString = this.props.selectedFacets.map(function(selectedFacet){
        const type = _self.props.facets[selectedFacet.key].type;
        if (type === 'text') {
          return `${selectedFacet.key}: '${selectedFacet.values}'`;
        }
        return `${selectedFacet.key}: ${selectedFacet.values}`;
    }).join(" AND ");

    const queryButton  = (<Button onClick={ () => _self.onQuery(queryString) }>
                          Refresh</Button>);

    const resultsStyle = {height:'500px'}
    const resultsContent = (
      <div style={resultsStyle}>
        <p>{queryString}</p>
        {queryButton}
        <Table/>
      </div>
    )
    // render main content, create a ref we can interrogate later
    // see https://facebook.github.io/react/docs/refs-and-the-dom.html
    //
    const schemaContent = (
      <div    ref={(e) => { this.schemaContainer = e; }} >
        <Schema width={this.schemaContainer ? this.schemaContainer.offsetWidth : 1000}
                height={this.schemaContainer ? this.schemaContainer.offsetHeight : 800}
                offset={this.state.sidebarSize} />
      </div>
    )

    return (
      <div>
        <style type="text/css">{`
        .panel-group-accordion-custom {
            margin-bottom: 0;
        }
        `}</style>

        <div className="page-home">
          <SplitPane
              size={this.state.sidebarSize}
              isResizing={this.state.isSidebarResizing}
              onResizeStart={this.onSidebarResizeStart}
              onResizeEnd={this.onSidebarResizeEnd}
              onChange={this.onSidebarChange}
              type="vertical"
              pane1Style={{ borderRight: '4px solid silver'}}
              >
                <div >{sidebarContent}</div>
                <SplitPane
                    size={this.state.mainSize}
                    isResizing={this.state.isMainResizing}
                    onResizeStart={this.onMainResizeStart}
                    onResizeEnd={this.onMainResizeEnd}
                    onChange={this.onMainChange}
                    type="horizontal"
                    pane1Style={{ borderBottom: '4px solid silver' }}
                    >
                      <div ref={(e) => { this.schemaContent = e; }} >
                        {schemaContent}
                      </div>
                      <div>
                        {resultsContent}
                      </div>
                </SplitPane>
          </SplitPane>
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
