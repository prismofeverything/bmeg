// required for all components
import React, { Component } from 'react'
import { render } from 'react-dom'
import { connect } from "react-redux";
import { push } from 'react-router-redux'
import Search from './Search'

export class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { dispatch } = this.props
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
        <img src="/media/bmeg.png" height="45" onClick={ () => dispatch(push('/')) }/>
          </span>
          <div className="mdl-layout-spacer"></div>
          <form action="#">
            <div className="mdl-textfield mdl-js-textfield">
              <div id="ophion-search">
                <Search scope={this.props.scope} />
              </div>        
            </div>
          </form>
          <div className="mdl-layout-spacer"></div>
        </div>
      </header>
    )
  }
}
export default connect() (Header)
