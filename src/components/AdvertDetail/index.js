import { withSnackbar } from 'notistack';

import AdvertDetail from './AdvertDetail';
import { compose } from '../../utils/Compose';
import withAdverts from '../../hocs/withAdverts';
import withUi from '../../hocs/withUi';

export default compose(withAdverts, withUi, withSnackbar)(AdvertDetail);
