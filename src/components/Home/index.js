import { withSnackbar } from 'notistack';

import Home from './Home';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';
import withTags from '../../hocs/withTags';

export default compose(withSession, withTags, withSnackbar)(Home);
