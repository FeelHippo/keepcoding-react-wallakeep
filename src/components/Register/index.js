import { withSnackbar } from 'notistack';

import Register from './Register';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';
import withTags from '../../hocs/withTags';

export default compose(withSession, withTags, withSnackbar)(Register);
