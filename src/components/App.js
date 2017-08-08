import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import "../stylesheets/main.scss";

import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';


export class App extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'SCHEMA_FETCH',
    })
    dispatch({
      type: 'FACETS_FETCH',
    })

  }

  render() {
    const theme = createMuiTheme();
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}
export default connect() (App)
