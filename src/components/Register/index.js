import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import Register from './Register';
import { getSession } from '../../store/selectors';
import { userLogin } from '../../store/actions';
import { compose } from '../../utils/Compose';

const mapStateToProps = state => ({
  session: getSession(state),
});

const mapDipatchToProps = {
  userLogin,
};

export default compose(
  connect(mapStateToProps, mapDipatchToProps),
  withSnackbar,
)(Register);
