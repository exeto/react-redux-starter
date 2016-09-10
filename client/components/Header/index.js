import React from 'react';

import Logo from '../../components/Logo';
import s from './style.scss';

const Header = () => (
  <h1 className={s.header}>
    <span className={s.logo}><Logo /></span>
    Hacker News <span className={s.top}>Top</span>
  </h1>
);

export default Header;
