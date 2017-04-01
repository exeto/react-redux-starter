import React from 'react';
import { Switch, Route } from 'react-router';

import App from './containers/App';
import ListFeeds from './containers/ItemsList';
import NotFound from './containers/NotFound';

const Routes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={ListFeeds} />
      <Route component={NotFound} />
    </Switch>
  </App>
);

export default Routes;
