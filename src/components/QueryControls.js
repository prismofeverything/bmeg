import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as _ from 'underscore'

// import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AddCircleIcon from 'material-ui-icons/AddCircle'
import FileDownloadIcon from 'material-ui-icons/FileDownload'
import PublishIcon from 'material-ui-icons/Publish'
import ClearIcon from 'material-ui-icons/Clear'

import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar'
import ToolbarSeparator from 'material-ui/Toolbar'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';

export class QueryControls extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props
    const focus = this.props.focus
    return (
      <Toolbar id="query-controls" className="query-controls">
        <ToolbarGroup>
          <ListItem button onClick={ () => dispatch({type: 'NEW_QUERY', focus: focus}) } >
            <ListItemIcon><ClearIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={ () => dispatch({type: 'OPEN_QUERY', focus: focus}) } >
            <ListItemIcon><FileDownloadIcon /></ListItemIcon>
          </ListItem>
          <ListItem button onClick={ () => dispatch({type: 'SAVE_QUERY', focus: focus}) } >
            <ListItemIcon><PublishIcon /></ListItemIcon>
          </ListItem>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

export default connect() (QueryControls)
            //   <FolderOpenIcon />
            //   <SaveIcon />
            //   <img color="contrast" src="/media/intersection.png" height="45" />
