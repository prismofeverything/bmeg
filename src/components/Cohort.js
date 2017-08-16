import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as _ from 'underscore'

import SplitPane from 'react-flex-split-pane';

import { withStyles, createStyleSheet } from 'material-ui/styles';
import Button from 'material-ui/Button';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ExpandLessIcon from 'material-ui-icons/ExpandLess';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import { CircularProgress } from 'material-ui/Progress';

import Schema from './Schema'
import Facet from './Facet'
import Table from './Table'

import List from 'material-ui/List';

// a `cohort` is a selection from a type/domain/label based on selected criteria
export class Cohort extends Component {

  constructor(props) {
    super(props);
    /* initial state */
    this.state = { sidebarSize: 300,
                   mainSize: 500,
                   sideBarOpen: true,
                   schemaOpen: true,
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
    if (this.props.label && _.isEmpty(this.props.path)) {
      this.props.dispatch({
        type: 'STEP_ON_PATH',
        label: this.props.label,
      })
    }
  }

  toggleSidebar() {
    const _self = this;
    this.setState(
      { sideBarOpen: !this.state.sideBarOpen } ,
      () => {
        window.setTimeout(function() {
          if (!_self.state.sideBarOpen) {
            _self.setState({oldSidbarSize:_self.state.sidebarSize, sidebarSize: 20 })
          } else {
            _self.setState({ sidebarSize: _self.state.oldSidbarSize })
          }
        }
        , 250) ;
      }
    );
  }
  toggleSchema() {
    this.setState(
      { schemaOpen: !this.state.schemaOpen },
      () => {
        if (!this.state.schemaOpen) {
          this.setState({oldMainSize:this.state.mainSize, mainSize: 16 })
        } else {
          this.setState({ mainSize: this.state.oldMainSize })
        }
      }
    );
  }

  // when user resizes splitters
  onSidebarResizeStart() {
    this.setState({ isSidebarResizing: true })
  }
  onSidebarResizeEnd() {
    this.setState({ isSidebarResizing: false })
    // console.log('sidebarSize',this.state.sidebarSize)
    // console.log('this.schemaContainer.offsetWidth',this.schemaContainer.offsetWidth)
    // console.log('this.schemaContainer.offsetHeight',this.schemaContainer.offsetHeight)
  }
  onSidebarChange(sidebarSize) {
    this.setState({ sidebarSize: sidebarSize })
  }
  onMainResizeStart() {
    this.setState({ isMainResizing: true })
  }
  onMainResizeEnd() {
    this.setState({ isMainResizing: false })
    // console.log('mainSize',this.state.mainSize)
  }
  onMainChange(mainSize) {
    this.setState({ mainSize: mainSize })
  }


  // render all facets
  render() {
    const _self = this;
    const classes = this.props.classes;
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
    if (!this.props.loading && facetItems.length < 1) {
        warnings = <h5><span className="label label-warning">No facets found for {this.props.label}</span></h5>;
    }

    var sidebarContent = (
      <div >
        <List key={this.props.label} >
          {facetItems}
        </List>
        {warnings}
      </div>
    );



    const resultsStyle = {height:'500px'}
    const resultsContent = (
      <div style={resultsStyle}>
        <Table key={this.props.label} label={this.props.label}/>
      </div>
    )
    // render main content, create a ref we can interrogate later
    // see https://facebook.github.io/react/docs/refs-and-the-dom.html
    //
    const schemaContent = (
      <div    ref={(e) => { this.schemaContainer = e; }} >
        <Schema width={1000} // {this.schemaContainer ? this.schemaContainer.offsetWidth : 1000}
                height={400} // {this.schemaContainer ? this.schemaContainer.offsetHeight : 400}
                offset={this.state.sidebarSize} />
      </div>
    )

    const collapseSidebarStyle = {float:'left', cursor: 'pointer'}
    var collapseSidebar;
    if (this.state.sideBarOpen) {
      collapseSidebar = (
          <ChevronLeftIcon
            style={collapseSidebarStyle}
            onClick={ () => _self.toggleSidebar() } />
      )
    } else {
      collapseSidebar = (
          <ChevronRightIcon
            style={collapseSidebarStyle}
            onClick={ () => _self.toggleSidebar() } />
      )
    }

    const collapseSchemaStyle = {float:'right', top:'-8px', cursor: 'pointer'}
    var collapseSchema
    if (this.state.schemaOpen) {
      collapseSchema = (
          <ExpandLessIcon
            style={collapseSchemaStyle}
            onClick={ () => _self.toggleSchema() } />
      )
    } else {
      collapseSchema = (
          <ExpandMoreIcon
            style={collapseSchemaStyle}
            onClick={ () => _self.toggleSchema() } />
      )
    }

    var sidebarLoading
    if (this.props.loading) {
        sidebarLoading = (<CircularProgress className={classes.progress} />)
        sidebarContent = null
    }

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
              pane1Style={{ borderRight: '4px solid silver',
                            transition: 'all .25s linear'}}
              >
                <div>
                  {collapseSidebar}
                  {sidebarLoading}
                  {sidebarContent}
                </div>
                <SplitPane
                    size={this.state.mainSize}
                    isResizing={this.state.isMainResizing}
                    onResizeStart={this.onMainResizeStart}
                    onResizeEnd={this.onMainResizeEnd}
                    onChange={this.onMainChange}
                    type="horizontal"
                    pane1Style={{ borderBottom: '4px solid silver',
                                  transition: 'all .25s linear'}}
                    >
                      <div ref={(e) => { this.schemaContent = e; }} >
                        {schemaContent}
                      </div>
                      <div>
                        {collapseSchema}
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

  // are facets loading?
  var loading = true
  if (state.facets) {
    loading = state.facets.loading
  }
  // our state
  return {
    label: own.params.label,
    schema: state.schema,
    facets: sortedFacets,
    path: state.path,
    selectedFacets: selectedFacets,
    loading: loading,
  }
}


const styleSheet = createStyleSheet(theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
}));

export default connect(mapStateToProps)(withStyles(styleSheet)(Cohort));
