import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Link from 'redux-first-router-link';

import { toItem } from '@/redux/router/actions';

class Post extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
  };

  render() {
    const { data, classes } = this.props;

    return (
      <article className={classes.wrapper}>
        <h2>
          <Link className={classes.link} to={toItem(data.id)}>
            {data.title}
          </Link>
        </h2>

        <p>{data.body}</p>
      </article>
    );
  }
}

export default Post;
