import React, { PropTypes } from 'react';

import Throbber from '../Throbber';
import s from './style.scss';

const Button = ({ children, onClick, isLoading }) => (
  isLoading ? (
    <div className={s.throbber}>
      <Throbber wait={200} />
    </div>
  ) : (
    <button className={s.button} onClick={onClick}>
      {children}
    </button>
  )
);

Button.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  isLoading: PropTypes.number,
};

export default Button;
