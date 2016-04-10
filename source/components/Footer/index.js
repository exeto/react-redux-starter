import React, { PropTypes } from 'react';
import classnames from 'classnames/bind';

import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../../constants/filters';
import style from './style.css';

const cx = classnames.bind(style);

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed',
};

const TodoCount = ({ activeCount }) => {
  const itemWord = activeCount === 1 ? 'item' : 'items';

  return (
    <span className={style.count}>
      <strong>{activeCount || 'No'}</strong> {itemWord} left
    </span>
  );
};

const FilterLink = ({ filter, selectedFilter, onShow }) => {
  const title = FILTER_TITLES[filter];

  return (
    <a
      className={cx({ selected: filter === selectedFilter })}
      style={{ cursor: 'pointer' }}
      onClick={() => onShow(filter)}
    >
      {title}
    </a>
  );
};

const ClearButton = ({ completedCount, onClearCompleted }) => {
  if (completedCount === 0) { return null; }

  return (
    <button className={style.clearCompleted} onClick={onClearCompleted} >
      Clear completed
    </button>
  );
};

const Footer = ({
  activeCount,
  filter: selectedFilter,
  onShow,
  completedCount,
  onClearCompleted,
}) => (
  <footer className={style.normal}>
    <TodoCount activeCount={activeCount} />
    <ul className={style.filters}>
      {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
        <li key={filter}>
          <FilterLink filter={filter} selectedFilter={selectedFilter} onShow={onShow} />
        </li>
      )}
    </ul>
    <ClearButton completedCount={completedCount} onClearCompleted={onClearCompleted} />
  </footer>
);

TodoCount.propTypes = {
  activeCount: PropTypes.number.isRequired,
};

FilterLink.propTypes = {
  filter: PropTypes.string.isRequired,
  selectedFilter: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
};

ClearButton.propTypes = {
  completedCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

Footer.propTypes = {
  activeCount: PropTypes.number.isRequired,
  filter: PropTypes.string.isRequired,
  onShow: PropTypes.func.isRequired,
  completedCount: PropTypes.number.isRequired,
  onClearCompleted: PropTypes.func.isRequired,
};

export default Footer;
