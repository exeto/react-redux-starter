import React, { PropTypes } from 'react';

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
