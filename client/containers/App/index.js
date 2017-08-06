import React from 'react';
import PropTypes from 'prop-types';

import Header from '../../components/Header';
import s from './style.scss';

const App = ({ children }) => (
  <div className={s.main}>
    <Header />
    {children}
  </div>
);

App.propTypes = {
  children: PropTypes.node.isRequired,
};

export default App;
