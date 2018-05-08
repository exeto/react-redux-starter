import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import Post from '@/components/Post';

class Item extends PureComponent {
  static propTypes = {
    data: PropTypes.object,
  };

  static defaultProps = {
    data: null,
  };

  render() {
    const { data } = this.props;

    return data ? <Post data={data} /> : null;
  }
}

export default Item;
