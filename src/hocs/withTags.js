import { connect } from 'react-redux';

import { getTags, areTagsLoaded } from '../store/selectors';
import { loadTags } from '../store/actions';

const mapStateToProps = state => ({
  tags: getTags(state),
  areTagsLoaded: areTagsLoaded(state),
});

const mapDispatchToProps = {
  loadTags,
};

export default connect(mapStateToProps, mapDispatchToProps);
