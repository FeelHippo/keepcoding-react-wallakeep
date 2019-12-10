import { connect } from 'react-redux';

import PrivateRoute from './PrivateRoute';
import { isUserRegistered } from '../../store/selectors';

const mapStateToProps = state => ({
  authorized: isUserRegistered(state),
});

export default connect(mapStateToProps)(PrivateRoute);
