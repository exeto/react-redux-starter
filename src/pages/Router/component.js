import React from 'react';
import PropTypes from 'prop-types';
import { NOT_FOUND } from 'redux-first-router';

import * as types from '@/redux/router/types';
import List from '@/pages/List';
import Item from '@/pages/Item';
import NotFound from '@/pages/NotFound';
import Base from '@/components/Base';

const mapping = {
  [types.LIST]: List,
  [types.ITEM]: Item,
  [NOT_FOUND]: NotFound,
};

const Router = ({ type }) => {
  const Component = mapping[type];

  return (
    <Base>
      <Component />
    </Base>
  );
};

Router.propTypes = {
  type: PropTypes.string.isRequired,
};

export default Router;
