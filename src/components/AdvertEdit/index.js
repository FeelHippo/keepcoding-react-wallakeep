import { withSnackbar } from 'notistack';

import AdvertEdit from './AdvertEdit';
import { compose } from '../../utils/Compose';
import withTags from '../../hocs/withTags';
import withAdverts from '../../hocs/withAdverts';
import withUi from '../../hocs/withUi';
import withKey from '../../hocs/withKey';

export default compose(
  withTags,
  withAdverts,
  withUi,
  withSnackbar,
  withKey(props => props.match.url),
)(AdvertEdit);
