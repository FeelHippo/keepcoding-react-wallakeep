import { withSnackbar } from 'notistack';

import Home from './Home';
import { compose } from '../../utils/Compose';
import withSession from '../../hocs/withSession';
import withTags from '../../hocs/withTags';
import withAdverts from '../../hocs/withAdverts';
import withUi from '../../hocs/withUi';

export default compose(
  withSession,
  withTags,
  withAdverts,
  withUi,
  withSnackbar,
)(Home);
