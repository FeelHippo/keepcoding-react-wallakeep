import { connect } from 'react-redux';

import {
  getAdverts,
  getNumAdverts,
  getNumPages,
  getAdvert,
} from '../store/selectors';
import { loadAdverts, searchAdverts, loadAdvert } from '../store/actions';

const mapStateToProps = (state, ownProps) => ({
  adverts: getAdverts(state),
  numAdverts: getNumAdverts(state),
  numPages: getNumPages(state),
  advert: getAdvert(state)(ownProps.match.params.id),
});

const mapDispatchToProps = {
  loadAdverts,
  searchAdverts,
  loadAdvert,
};

export default connect(mapStateToProps, mapDispatchToProps);
