import React from 'react';
import Schema from './Schema'

// Home page component
export default class Home extends React.Component {
  // render
  render() {
    return (
      <div className="page-home">
        <Schema width={800} height={800} />
        <h4>Hello world!</h4>
      </div>
    );
  }
}
