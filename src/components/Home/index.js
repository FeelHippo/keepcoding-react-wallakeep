import { withSnackbar } from 'notistack';

import Home from './Home';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';

export default compose(withSession, withSnackbar)(Home);
