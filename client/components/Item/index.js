import React, { PropTypes } from 'react';
import relativeDate from 's-ago';

import s from './style.scss';

const Item = ({ item }) => {
  const date = relativeDate(new Date(item.time * 1000));
  return (
    <div className={s.wrapper}>
      <h2 className={s.header}>
        <a href={item.url} className={s.link} target="_blank" rel="noopener noreferrer">
          {item.title}
        </a>
      </h2>
      <div className={s.subtext}>
        <span className={s.subtextItem}>{item.score} points</span>
        <span className={s.subtextItem}>{item.by}</span>
        <span className={s.subtextItem}>{date}</span>
        <span className={s.subtextItem}>{item.descendants} comments</span>
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
