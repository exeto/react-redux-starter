import { connect } from 'react-redux';

import { getPost } from '@/redux/posts/selectors';
import { getParam } from '@/redux/router/selectors';
import Item from './component';

const mapStateToProps = state => ({
  data: getPost(state, getParam(state, 'id')),
});

export default connect(mapStateToProps)(Item);
