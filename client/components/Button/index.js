import React, { PropTypes } from 'react';

import Throbber from '../Throbber';
import s from './style.scss';

const Button = ({ children, handleClick, isLoading }) => (
  isLoading ? (
    <div className={s.throbber}>
      <Throbber wait={200} />
    </div>
  ) : (
    <button className={s.button} onClick={handleClick} type="button">
      {children}
    </button>
  )
);

Button.propTypes = {
  children: PropTypes.node,
  handleClick: PropTypes.func,
  isLoading: PropTypes.number,
};

export default Button;
