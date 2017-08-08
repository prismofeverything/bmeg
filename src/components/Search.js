import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";

import SearchBar from 'material-ui-search-bar'

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      timeout: null
    }
    this.debounceInterval = 500;
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

  handleChange(value) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }

    var self = this;
    var timeout = setTimeout(function() {self.triggerSearch(value)}, this.debounceInterval)
    this.setState({text: value, timeout: timeout})
  }

  render() {
    return (
      <SearchBar
           onChange={this.handleChange.bind(this)}
           onRequestSearch={() => console.log('onRequestSearch')}
           style={{
             margin: '0 auto',
             maxWidth: 800,
             width: '100%',
           }}
         />
    )
  }
}

function mapStateToProps(state, own) {
  return state.search;
}
export default connect(mapStateToProps) (Search);
