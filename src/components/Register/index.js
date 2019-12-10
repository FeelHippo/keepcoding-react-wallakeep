import { connect } from 'react-redux';
import { withSnackbar } from 'notistack';

import Register from './Register';
import { getSession } from '../../store/selectors';
import { compose } from '../../utils/Compose';

const mapStateToProps = state => ({
  session: getSession(state),
});

export default compose(connect(mapStateToProps), withSnackbar)(Register);
