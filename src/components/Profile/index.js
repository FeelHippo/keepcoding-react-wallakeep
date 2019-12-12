import { withSnackbar } from 'notistack';

import Profile from './Profile';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';

export default compose(withSession, withSnackbar)(Profile);
