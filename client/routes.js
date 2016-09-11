import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './containers/App';
import ListFeeds from './containers/ItemsList';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={ListFeeds} />
  </Route>
);
