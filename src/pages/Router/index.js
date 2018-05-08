import { connect } from 'react-redux';

import { getType } from '@/redux/router/selectors';
import Router from './component';

const mapStateToProps = state => ({
  type: getType(state),
});

export default connect(mapStateToProps)(Router);
