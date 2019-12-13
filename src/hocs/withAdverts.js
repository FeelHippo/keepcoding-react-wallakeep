import { connect } from 'react-redux';

import { getAdverts, getNumAdverts, getNumPages } from '../store/selectors';
import { loadAdverts, searchAdverts } from '../store/actions';

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  numAdverts: getNumAdverts(state),
  numPages: getNumPages(state),
});

const mapDispatchToProps = {
  loadAdverts,
  searchAdverts,
};

export default connect(mapStateToProps, mapDispatchToProps);
