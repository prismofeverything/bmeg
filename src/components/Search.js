import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import { Field, SubmissionError } from "redux-form";
import * as _ from 'underscore'

// export class ResultColumn extends Component {
//   constructor(props) {
//     super(props);
//   }

//   render() {
//     let rows = _.map(this.props.items, function(row) {
//       var unpre = row.gid.split(':').slice(1).join(':');
//       return <div key={row.gid}>
//         <a href={"/?gid=" + row.gid}>{unpre}</a>
//       </div>
//     });

//     return <div>
//       <h3>{this.props.label}</h3>
//       {rows}
//       </div>
//   }
// }

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      timeout: null
    }
    this.debounceInterval = 500;
  }

  // groupResults(results) {
  //   if (!results[0]) {
  //     return {}
  //   } else {
  //     return _.groupBy(results, function(r) {return r.label})
  //   }
  // }

  // doSearch(value) {
  //   var self = this;
  //   this.O.query().searchVertex(value).execute(function(results) {
  //     var groups = self.groupResults(results)
  //     console.log('results: ' + results.length)
  //     console.log('first result: ' + Object.keys(groups))

  //     self.setState({results: groups})
  //   })
  // }

  triggerSearch(value) {
    const {dispatch, scope} = this.props;
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'SEARCH_ALL_SUBMIT',
        scope: scope,
        search: value,
        callbackError: (error) => {
          reject(new SubmissionError({_error: error}));
        },
        callbackSuccess: () => {
          // dispatch(push('/'));
          resolve();
        }
      });
    });
  }

  handleChange(event) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }

    var value = event.target.value;
    var self = this;
    var timeout = setTimeout(function() {self.triggerSearch(value)}, this.debounceInterval)
    this.setState({text: value, timeout: timeout})
  }

  render() {
    return (
      <div>
        <input id="search-input" type="text" onChange={this.handleChange.bind(this)} />
      </div>
    )
  }
}

function mapStateToProps(state, own) {
  return state.search;
}
export default connect(mapStateToProps) (Search);
