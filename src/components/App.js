import React from "react";
import { connect } from "react-redux";
import Header from "./Header"
import "../stylesheets/main.scss";

import createMuiTheme from 'material-ui/styles/theme';
import { MuiThemeProvider } from 'material-ui/styles';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

export class App extends React.Component {
  componentDidMount() {
    const {dispatch} = this.props;
    dispatch({
      type: 'STARTUP',
      focus: this.props.focus,
      label: this.props.focus
    })
  }

  render() {
    const theme = createMuiTheme();
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <Header focus={this.props.focus} />
          {this.props.children}
        </div>
      </MuiThemeProvider>
    );
  }
}

function mapStateToProps(state, own) {
  return {
    focus: own.params.label,
  }
}
export default connect(mapStateToProps) (App)
