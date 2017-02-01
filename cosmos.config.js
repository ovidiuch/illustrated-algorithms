import React from 'react';
import createContextProxy from '../react-cosmos/packages/react-cosmos-context-proxy';

export default {
  componentPaths: ['./components'],
  proxies: [
    createContextProxy({
      childContextTypes: {
        layout: React.PropTypes.object,
      },
    }),
  ],
  hot: true,
  hmrPlugin: true,
};
