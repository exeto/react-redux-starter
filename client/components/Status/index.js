import React from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router';

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code;
      }

      return children;
    }}
  />
);

Status.propTypes = {
  code: PropTypes.number.isRequired,
  children: PropTypes.element.isRequired,
};

export default Status;
