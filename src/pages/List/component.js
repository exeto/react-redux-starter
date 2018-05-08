import React from 'react';
import PropTypes from 'prop-types';

import Post from '@/components/Post';

const List = ({ items }) =>
  items.map(item => <Post key={item.id} data={item} />);

List.propTypes = {
  items: PropTypes.array.isRequired,
};

export default List;
