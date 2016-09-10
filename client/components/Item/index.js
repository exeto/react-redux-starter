import React, { PropTypes } from 'react';
import relativeDate from 's-ago';

import s from './style.scss';

const Item = ({ item }) => {
  const date = relativeDate(new Date(item.time * 1000));
  const commentWord = item.descendants === 1 ? 'comment' : 'comments';

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
        {typeof item.descendants !== 'undefined' ? (
          <a
            href={`https://news.ycombinator.com/item?id=${item.id}`}
            className={`${s.subtextItem} ${s.commentsLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {item.descendants} {commentWord}
          </a>
        ) : null}
      </div>
    </div>
  );
};

Item.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Item;
