import React, { Component } from 'react'
import Schema from './Schema'
import { connect } from 'react-redux'
import Sidebar from 'react-sidebar';
import Results from './Results'

// Home page component
export class Home extends Component {
  // render
  render() {
    const sidebar = <Results schema={this.props.schema} search={this.props.search} />
    const styles = {
      root: {
        marginTop: '5em',
      }
    }
    return (
      <div className="page-home">
        <Sidebar styles={styles} sidebar={sidebar} open={true} docked={true} sidebarClassName='sidebar-container'>
          <Schema width={800} height={800} />
        </Sidebar>
      </div>
    );
  }
}

function mapStateToProps(state, own) {
  return {
    search: state.search,
    schema: state.schema,
  }
}
export default connect(mapStateToProps) (Home)
