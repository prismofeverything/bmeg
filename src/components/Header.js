// required for all components
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import { push } from 'react-router-redux'
import Search from './Search'


import { withStyles, createStyleSheet } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';


export class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props
    const classes = this.props.classes;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton color="contrast" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <img color="contrast" src="/media/bmeg.png" height="45" onClick={ () => dispatch(push('/')) }/>
            <Search scope={this.props.scope} />
          </Toolbar>
        </AppBar>
      </div>
    );

    // return (
    //   <header className="mdl-layout__header">
    //     <div className="mdl-layout__header-row">
    //       <span className="mdl-layout-title">
    //     <img src="/media/bmeg.png" height="45" onClick={ () => dispatch(push('/')) }/>
    //       </span>
    //       <div className="mdl-layout-spacer"></div>
    //       <form action="#">
    //         <div className="mdl-textfield mdl-js-textfield">
    //           <div id="ophion-search">
    //             <Search scope={this.props.scope} />
    //           </div>
    //         </div>
    //       </form>
    //       <div className="mdl-layout-spacer"></div>
    //     </div>
    //   </header>
    // )
  }
}

const styleSheet = createStyleSheet({
  root: {
    marginTop: 4,
    width: '100%',
  },
  flex: {
    flex: 1,
  },
});

export default withStyles(styleSheet)(Header);
