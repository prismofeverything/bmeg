import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as _ from 'underscore'

// import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import { createMuiTheme } from 'material-ui/styles';

import AddCircleIcon from 'material-ui-icons/AddCircle'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import PublishIcon from 'material-ui-icons/Publish'
import ClearIcon from 'material-ui-icons/Clear'

import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar'
import ToolbarSeparator from 'material-ui/Toolbar'
import List, {
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from 'material-ui/List';

import TextField from 'material-ui/TextField';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import Button from 'material-ui/Button';

export class QueryControls extends Component {
  constructor(props) {
    super(props)
    this.state = {
      saving: false,
      savingValue: '',
      loading: false,
      loadingValue: '',
    }
  }

  openSaveQuery() {
    this.setState({saving: true})
  }

  closeSaveQuery() {
    this.setState({saving: false})
  }

  savingChange(e) {
    this.setState({savingValue: e.target.value})
  }

  saveQuery() {
    const { dispatch } = this.props
    const query = {
      user: 'other',
      key: this.state.savingValue,
      focus: this.props.focus,
      path: this.props.path,
      query: this.props.query,
    }

    console.log(query)
    this.setState({saving: false})

    dispatch({type: 'SAVE_QUERY', query: query})
  }

  openLoadQuery() {
    this.setState({loading: true})
  }

  closeLoadQuery() {
    this.setState({loading: false})
  }

  loadingChange(query) {
    return function(e) {
      console.log(e)
      this.setState({loadingValue: e.target.value})
    }
  }

  loadQuery(query) {
    return function(e) {
      const { dispatch } = this.props
      this.setState({loading: false})
      dispatch({type: 'TRIGGER_LOAD_QUERY', query: query})
    }
  }

  render() {
    const { dispatch } = this.props
    const focus = this.props.focus
    const self = this
    
    const queriesList = _.map(_.keys(this.props.queries), function(label) {
      const items = _.map(self.props.queries[label], function(query) {
        return <ListItem key={query.key} onClick={self.loadQuery(query).bind(self)}>{query.key}</ListItem>
      })

      return (
        <div key={label}>
          <ListSubheader key={label}>{label}</ListSubheader>
          {items}
        </div>
      )
    })

    return (
      <div>
      <Toolbar id="query-controls" className="query-controls">
        <ToolbarGroup>
          <ListItem button onClick={() => dispatch({type: 'NEW_QUERY', focus: focus})}>
            <ListItemIcon><ClearIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={this.openSaveQuery.bind(this)}>
            <ListItemIcon><PublishIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={this.openLoadQuery.bind(this)}>
            <ListItemIcon><FileDownloadIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={this.props.toggleChooser}>
            <ListItemIcon><img color="contrast" src="/media/intersection.png" height="45" /></ListItemIcon>
          </ListItem>
        </ToolbarGroup>
      </Toolbar>
      <Dialog open={this.state.saving} onRequestClose={this.closeSaveQuery.bind(this)}>
        <DialogTitle>{`Save ${focus} Cohort`}</DialogTitle>
        <DialogContent>
        <TextField value={this.state.savingValue} onChange={this.savingChange.bind(this)} />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeSaveQuery.bind(this)}>Cancel</Button>
          <Button onClick={this.saveQuery.bind(this)}>Save Cohort</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={this.state.loading} onRequestClose={this.closeLoadQuery.bind(this)}>
        <DialogTitle>{`Load ${focus} Cohort`}</DialogTitle>
        <DialogContent>
        {queriesList}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.closeLoadQuery.bind(this)}>Cancel</Button>
        </DialogActions>
      </Dialog>
      </div>
    )
  }
}

const theme = createMuiTheme();
const styles = {
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  options: {},
};

function mapStateToProps(state, own) {
  const focus = own.focus
  var query = state.currentQuery[focus].query
  query = query ? query.query : query
  const queries = state.queries
  console.log('query', query)
  console.log('queries', queries)
  return {
    focus: focus,
    label: focus,
    path: state.path,
    query: query,
    queries: queries,
  }
}
export default connect(mapStateToProps) (withStyles(styles) (QueryControls))
            //   <FolderOpenIcon />
            //   <SaveIcon />
            //   <img color="contrast" src="/media/intersection.png" height="45" />
 // ({type: 'SAVE_QUERY', focus: focus})}>
        //<TextField hintText="cohort name" />
// <<<<<<< HEAD
//             <div>
//               <AddCircleOutlineIcon onClick={() => {alert('// TODO - as use case develops add actions here ( and make it its own component i.e. QueryStore)')}} />
//               <FolderOpenIcon onClick={() => {alert('// TODO - as use case develops add actions here ( and make it its own component i.e. QueryStore)')}} />
//               <SaveIcon onClick={() => {alert('// TODO - as use case develops add actions here ( and make it its own component i.e. QueryStore)')}} />
//               <img color="contrast" src="/media/intersection.png" height="45" onClick={_self.toggleCohortChooser}/>
//             </div>
// =======


          // <ListItem button onClick={() => dispatch({type: 'NAVIGATE_COMPARE', focus: focus})}>
          // <Button onClick={this.loadQuery(focus).bind(this)}>Load Cohort</Button>
