import PropTypes from 'prop-types';
import createContextProxy from 'react-cosmos-context-proxy';

export default createContextProxy({
  childContextTypes: {
    layout: PropTypes.object
  }
});
