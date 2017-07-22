// required for all components
import React, { Component } from 'react'
import { render } from 'react-dom'
import Search from './Search'

export default class Header extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <header className="mdl-layout__header">
        <div className="mdl-layout__header-row">
          <span className="mdl-layout-title">
            <a href="http://bmeg.io/">
              <img src="/media/bmeg.png" height="45"/>
            </a>
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
