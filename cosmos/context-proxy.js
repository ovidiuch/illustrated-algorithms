import React from 'react';
import createContextProxy from 'react-cosmos-context-proxy';

export default () =>
  createContextProxy({
    childContextTypes: {
      layout: React.PropTypes.object,
    },
  });
