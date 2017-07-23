import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { history } from './store.js';
import App from './components/App';
import Home from './components/Home';
import Vertex from './components/Vertex';
import Edge from './components/Edge';
import NotFound from './components/NotFound';

// build the router
const router = (
  <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
    <Route path='/' component={App}>
      <IndexRoute component={Home} />
      <Route path='explore/vertex(/:gid)' component={Vertex} />
      <Route path='explore/edge(/:from/:label/:to)' component={Edge} />
      <Route path='*' component={NotFound} />
    </Route>
  </Router>
);

// export
export { router };
