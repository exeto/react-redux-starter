import React from 'react';
import { hot } from 'react-hot-loader';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';

import Router from '@/pages/Router';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
};

export default hot(module)(Root);
