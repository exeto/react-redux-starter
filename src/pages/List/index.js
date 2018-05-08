import { connect } from 'react-redux';

import { getPosts } from '@/redux/posts/selectors';
import List from './component';

const mapStateToProps = state => ({
  items: getPosts(state),
});

export default connect(mapStateToProps)(List);
