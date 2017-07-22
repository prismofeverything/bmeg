import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import "../stylesheets/main.scss";

// app component
export class App extends React.Component {
  // render
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'SCHEMA_FETCH',
    })
  }

  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
}
export default connect() (App)
