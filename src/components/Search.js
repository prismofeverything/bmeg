import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";

// import SearchBar from 'material-ui-search-bar'

import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import { grey } from 'material-ui/colors'

import CodeMirror from 'react-codemirror'
require('codemirror/mode/solr/solr');
// see main.scss for inclusion and overrides
// require('codemirror/lib/codemirror.css');
// require('codemirror/addon/hint/show-hint.css');

export class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      text: "",
      timeout: null
    }
    this.debounceInterval = 500;
    this.autocomplete = this.autocomplete.bind(this);
    this.get_hints  = this.get_hints.bind(this);
    this.onEnter = this.onEnter.bind(this);
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

  // update state when search updated
  handleChange(value) {
    if (this.state.timeout) {
      clearTimeout(this.state.timeout);
      this.setState({timeout: null});
    }

    var self = this;
    var timeout = setTimeout(function() {self.triggerSearch(value)}, this.debounceInterval)
    this.setState({text: value, timeout: timeout})
  }


  // set up our call back, etc for autocompletion
  componentDidMount() {
    const { dispatch, page, query } = this.props;

       // see CodeMirror's anyword-hint for background
       let cm = this.refs['editor'].getCodeMirrorInstance();
       let showHint = require('./show_hint');

       showHint(cm);
       // when auto suggesting, look for words that include . _
       var WORD = /([\u4e00-\u9fa5]|[a-zA-Z]|[\._])+/;
       cm.registerHelper("hint", "tag", function (editor, options) {
           var word = options && (options.word || WORD);
           // var range = options && (options.range || RANGE);
           var cur = editor.getCursor(), curLine = editor.getLine(cur.line);
           var end = cur.ch, start = end;
           while (start && word.test(curLine.charAt(start - 1)))--start;
           var curWord = start !== end && curLine.slice(start, end);

           var list = []
           var data = editor.options.hints(); // set in render, grab from current responses
           for (var k in data){
               if (data.hasOwnProperty(k) ) {
                 if (!curWord) {
                   list.push(k);
                   list.push(data[k]);
                 } else if (k.startsWith(curWord)) {
                   list.push(k);
                 }
                //  else if (data[k].startsWith(curWord)) {
                //    list.push(data[k]);
                //  }
               }
           }
           list.sort()
           return { list: list, from: cm.Pos(cur.line, start), to: cm.Pos(cur.line, end) };
       });
     }

  autocomplete(cm) {
       let codeMirror = this.refs['editor'].getCodeMirrorInstance();
       codeMirror.showHint(cm, codeMirror.hint.tag);
   }

   onEnter(cm) {
       // if enter hit in query field, submit form
       this.onQuery();
   }
   // when user hits query button
   onQuery(queryString) {
     const { dispatch } = this.props
     // get updated aggregations
     dispatch({
       type: 'REFRESH_QUERY',
       selectedFacets: this.props.selectedFacets,
       label: this.props.label,
       focus: this.props.label,
       path: this.props.path,
     })
     this.triggerSearch();
   }

   triggerSearch() {
     const {dispatch} = this.props;
     return new Promise((resolve, reject) => {
       dispatch({
         type: 'FACETS_SEARCH',
         selectedFacets: this.props.selectedFacets,
         label: this.props.label,
         callbackError: (error) => {
           reject({_error: error});
         },
         callbackSuccess: () => {
           resolve();
         }
       });
     });
   }

   get_hints() {
     const {resources} = this.props;
     return this.props.facets;
   }

   // if a facet is selected ...
   componentWillReceiveProps(nextProps) {
     const props = nextProps;
     const currentFacetString = function()  {
         if (!props.currentFacet) {
           return
         }
         if (!props.facets[props.currentFacet.key]) {
           return
         }
         const type = props.facets[props.currentFacet.key].type;
         if (type === 'text') {
           return `${props.currentFacet.key}:'${props.currentFacet.values}'`;
         }
         return `${props.currentFacet.key}:${props.currentFacet.values}`;
     }

     // check that a real update happened
     const cf = currentFacetString();
     if (cf && !( cf && this.state.text && this.state.text.indexOf(cf) > -1)) {
       // just update search bar, don't update state or re-render
       this.insertTextAtCursor(` AND ${cf} `);
     }
   }
   // ... insert it into the search bar at the current cursor
   insertTextAtCursor(text) {
     if (!text) { return }
     if (!this.refs['editor'])  { return }
     let editor = this.refs['editor'].getCodeMirror();
     var doc = editor.getDoc();
     var cursor = doc.getCursor();
     doc.replaceRange(text, cursor);
   }



  render() {
    const props = this.props;

    var options = {
      mode: 'solr',
      autofocus: false, // not that it's lowercase, from the CodeMirror Docs
       extraKeys: {
         'Enter': this.onEnter,
         'Ctrl-Space': this.autocomplete,
         'Tab': false,
       },
      hints: this.get_hints
    };
    return (
        <Paper
          style={{ width:'100%',
                   height: 48,
                   display: 'flex',
                   marginLeft: '8px',
                   justifyContent: 'space-between' }}
          >
          <div style={{ margin: 'auto 8px', width: '100%' }}>
            <CodeMirror ref="editor"
                        name="editor"
                        value={this.state.text}
                        onChange={this.handleChange.bind(this)}
                        options={options}
                        />
          </div>
          <IconButton style={{
              transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
            }}
            onTouchTap={this.onEnter}
            >
            <SearchIcon color={grey} />
          </IconButton>
        </Paper>
    )
  }
}

function mapStateToProps(state, own) {
  return { search: state.search,
           facets: state.facets,
           selectedFacets: state.selectedFacets,
           currentFacet: state.currentFacet,
           path: state.path,
           label: state.currentFacet ? state.currentFacet.label : null
         };
}
export default connect(mapStateToProps) (Search);
