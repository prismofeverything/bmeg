import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";


import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import SearchIcon from 'material-ui-icons/Search'
import { grey, yellow, green, red } from 'material-ui/colors'

import CodeMirror from 'react-codemirror'
require('codemirror/mode/solr/solr');
// see main.scss for inclusion and overrides

import ReactTooltip from 'react-tooltip'
import Parser from 'lucene-query-parser';
import * as _ from 'underscore'

export class Search extends Component {

  constructor(props) {
    super(props)
    this.state = {
      timeout: null,
      dirty: false,
      lastFacet: null,
    }
    this.debounceInterval = 500;
    this.autocomplete = this.autocomplete.bind(this);
    this.get_hints  = this.get_hints.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.showParserError = this.showParserError.bind(this);
  }

  triggerSearch(value, parsedQuery) {
    const {dispatch, search} = this.props;

    // var results = Parser.parse(this.state.text);
    // console.log('parsed query', results);
    // console.log('reformulated query', this.stringifyQuery(results));

    const _self = this;
    _self.setState({dirty:false})
    return new Promise((resolve, reject) => {
      dispatch({
        type: 'SEARCH_ALL_SUBMIT',
        scope: search.scope,
        queryString: value,
        parsedQuery: parsedQuery,
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
    var timeout;
    var isDirty = true;
    var newQuery = value
    var parserError = undefined
    var parsedQuery;
    try {
      parsedQuery = Parser.parse(value)
      newQuery = this.stringifyQuery(parsedQuery)
    } catch (e) {
      parserError = e
    }
    if (!this.state.dirty && !parserError) {
      timeout = setTimeout(function() {self.triggerSearch(newQuery, parsedQuery)}, this.debounceInterval)
    }
    this.setState({text: newQuery,
                   timeout: timeout,
                   dirty:isDirty,
                   parsedQuery: parsedQuery,
                   parserError:parserError})
  }

  onEnter(cm) {
      // if user clicked query icon or hit enter key,
      this.triggerSearch(this.state.text);
  }

  showParserError() {
    alert(this.state.parserError)
  }

  // set up our call back, etc for autocompletion
  componentDidMount() {
    const { dispatch, page, query } = this.props;


       let cm = this.refs['editor'].getCodeMirrorInstance();
       // set gutterClick
       let editor = this.refs['editor'].getCodeMirror();
       const _self = this;
       editor.on("gutterClick", function(cm, n) {
         _self.showParserError()
       });

       // see CodeMirror's anyword-hint for background
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

   get_hints() {
     const {resources} = this.props;
     return this.props.facets;
   }


   componentWillReceiveProps(nextProps) {
     const _self = this ;
     const currentFacetString = function()  {
         if (!nextProps.currentFacet) {
           return
         }
         if (!nextProps.facets[nextProps.currentFacet.key]) {
           return
         }
         if (_self.state.lastFacet ===  nextProps.currentFacet.key) {
           return
         }
         const type = nextProps.facets[nextProps.currentFacet.key].type;
         var str
         if (type === 'text') {
           str = `${nextProps.currentFacet.key}:"${nextProps.currentFacet.value}"`;
         } else {
           str =`${nextProps.currentFacet.key}:${nextProps.currentFacet.value}`;
         }
         return _self.stringifyQuery(Parser.parse(str))
     }



     // check that a real update happened
     var facetChanged = false;
     var scopeChanged = false;
     var newQueryText;
     var parserError;
     var parsedQuery;
     if (nextProps.currentFacet.key) {
       if (_self.state.lastFacetKey !==  nextProps.currentFacet.key) {
         facetChanged = true;
       }
       if (_self.state.lastFacetValue !==  nextProps.currentFacet.value) {
         facetChanged = true;
       }
     }
     if (nextProps.search && _self.props.search && (nextProps.search.scope !== _self.props.search.scope)) {
       facetChanged = true;
       scopeChanged = true;
     }

     if (scopeChanged) {
       parsedQuery = nextProps.currentQuery[nextProps.search.scope].queryString || ''
       this.replaceText(parsedQuery)
       this.handleChange(parsedQuery)
     } else if (facetChanged) {
       try {
         var currentParsedQuery = Parser.parse(_self.props.text || '')
         const replaced = this.replaceTerm(currentParsedQuery, nextProps.currentFacet.key, nextProps.currentFacet.value)
         if (!replaced) {
            const cf = currentFacetString();
            newQueryText = this.insertTextAtCursor(` ${cf} `);
         } else {
            newQueryText = this.stringifyQuery(currentParsedQuery);
         }
         parsedQuery = this.stringifyQuery(Parser.parse(newQueryText))
         this.replaceText(parsedQuery)
         this.handleChange(parsedQuery)
       } catch (e) {
         parserError = e
         parsedQuery = newQueryText
         console.log('componentWillReceiveProps error', newQueryText,e)
       }
     }
     this.setState({text:parsedQuery,
                    parserError:parserError,
                    lastFacetKey: nextProps.currentFacet.key,
                    lastFacetValue: nextProps.currentFacet.value,
                   })


   }

   // ... insert it into the search bar at the current cursor
   insertTextAtCursor(text) {
    //  if (!text) { return }
     if (!this.refs['editor'])  { return }
     let editor = this.refs['editor'].getCodeMirror();
     var doc = editor.getDoc();
     var cursor = doc.getCursor();
     doc.replaceRange(text, cursor);
     return editor.getValue()
   }

   // ... replace search bar, place cursor at end
   replaceText(text) {
    //  if (!text) { return }
     if (!this.refs['editor'])  { return }
     let editor = this.refs['editor'].getCodeMirror();
     var doc = editor.getDoc();
     var oldCursor = doc.getCursor();
     editor.setValue(text);
     editor.setCursor({line: 1, ch: text.length})
     var cursor = doc.getCursor();
     return editor.getValue()
   }

   // ... get search bar text
   getText() {
     if (!this.refs['editor'])  { return }
     let editor = this.refs['editor'].getCodeMirror();
     return editor.getValue()
   }



   // PreOrderTraversal parsed query, replace field term , return true on replace
   replaceTerm(root, field, term) {
    // hack: replace an existing vector with a term, see stringify array handling
    if (root.field === field) {
      root.term = term;
      delete root.left
      delete root.right
      return true
    }
    var replaced = false ;
    if (root.left) {
      replaced = this.replaceTerm(root.left, field, term);
    }
    if (!replaced && root.right) {
      replaced = this.replaceTerm(root.right, field, term);
    }
    return replaced;
   }

   // PreOrderTraversal parsed query, recreate query string
   stringifyQuery(root,str = '') {

     var quote = (s) => {
       const specialChars = [ ':', ' ', '-', '+']
       const found = _.find(specialChars, (c) => {return s.indexOf(c) > -1})
       if (found) {
         return `"${s}" `
       }
       return `${s} `
     }
     // simple field
     if (root.field && root.field !== '<implicit>') {
       str = str.concat(`${root.field}:`)
     }
     // simple term, quote if it has blanks or embedded colon
     if (root.term) {
       if (Array.isArray(root.term)) {
         str = str.concat(['(',
                          _.map(root.term, (t) => { return quote(t) }).join(' ')
                          , ')'].join(''))
       } else {
         str = str.concat(quote(root.term))
       }
     }
     // explicit operator, surround with parenthesis
     if (root.operator && root.operator !== '<implicit>') {
       str = str.concat(`(`)
     }
     // vector start, surround with parenthesis
     if (root.field && root.field !== '<implicit>' && root.operator && root.left && root.operator === '<implicit>') {
       str = str.concat(`(`)
     }
     // recurse left tree
     if (root.left) {
       str =   this.stringifyQuery(root.left,str)
     }
     // explicit operator
     if (root.operator && root.operator !== '<implicit>') {
       str = str.concat(` ${root.operator} `)
     }
     // recurse right tree
     if (root.right) {
       str = this.stringifyQuery(root.right,str);
     }
     // vector end, terminate parenthesis
     if (root.field && root.field !== '<implicit>' && root.operator && root.left && root.operator === '<implicit>') {
       str = str.concat(`)`)
     }
     // explicit operator end, terminate parenthesis
     if (root.operator && root.operator !== '<implicit>') {
       str = str.concat(`)`)
     }
     return str
   }

  render() {
    const props = this.props;
    const _self = this;
    // display error if parse error, see showParserError()
    var gutters = ['CodeMirror-ok'];
    if (this.state.parserError) {
      gutters = ['CodeMirror-error']
    }

    var options = {
      mode: 'solr',
      autofocus: false, // not that it's lowercase, from the CodeMirror Docs
       extraKeys: {
         'Enter': this.onEnter,
         'Ctrl-Space': this.autocomplete,
         'Tab': false,
       },
      hints: this.get_hints,
      // gutters: gutters
    };

    var iconColor
    var iconTooltip
    if (this.state.parserError) {
      iconColor = 'red'
      iconTooltip = this.state.parserError.message
    } else {
      iconColor = _self.state.dirty ? 'yellow' : 'green'
      iconTooltip = _self.state.dirty ? 'Refresh Needed' : 'Query OK'
    }

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
                        value={this.props.text}
                        onChange={this.handleChange.bind(this)}
                        options={options}
                        />
          </div>
          <IconButton style={{
              transition: 'transform 200ms cubic-bezier(0.4, 0.0, 0.2, 1)',
              borderRadius: 'inherit',
              backgroundColor: 'lightgrey'
            }}
            onTouchTap={this.onEnter}
            data-tip
            data-for='DIRTY_QUERY'
            >
            <SearchIcon style={{color:iconColor}} />
          </IconButton>
          <ReactTooltip id='DIRTY_QUERY' type="info">
            <span>{iconTooltip}</span>
          </ReactTooltip>
        </Paper>
    )
  }
}

function mapStateToProps(state, own) {
  const currentScope = state.currentQuery[state.search.scope]
  var text = own.text, currentFacet = {}, selectedFacets = []
  if (currentScope) {
    text = currentScope.queryString ? currentScope.queryString : '' ;
    currentFacet = currentScope.currentFacet ? currentScope.currentFacet : {};
    selectedFacets = currentScope.selectedFacets ? currentScope.selectedFacets : [];
  }

  return {
    search: state.search,
    facets: state.facets,
    selectedFacets: selectedFacets,
    currentFacet: currentFacet,
    schema: state.schema,
    path: state.path,
    currentQuery: state.currentQuery,
    text: text,
  };
}
export default connect(mapStateToProps) (Search);
