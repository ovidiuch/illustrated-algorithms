import PropTypes from 'prop-types';
import React from 'react';

import binarySearch from '../../algorithms/binary-search';
import quicksort from '../../algorithms/quicksort';
import bfs from '../../algorithms/bfs';
import computeBinaryBindingLayout from '../../layout/binary-search';
import computeQuicksortLayout from '../../layout/quicksort';
import computeBfsLayout from '../../layout/bfs';

const layoutRefs = {
  binarySearch: {
    code: binarySearch.code,
    computeLayout: computeBinaryBindingLayout
  },
  quicksort: {
    code: quicksort.code,
    computeLayout: computeQuicksortLayout
  },
  bfs: {
    code: bfs.code,
    computeLayout: computeBfsLayout
  }
};

class LayoutProxy extends React.Component {
  render() {
    const { nextProxy, fixture } = this.props;
    const { layoutFor } = fixture;

    if (!layoutFor) {
      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next()
      });
    }

    const { code, computeLayout } = layoutRefs[layoutFor];
    const layout = computeLayout({
      width: 1200,
      height: 600,
      code
    });

    return React.createElement(nextProxy.value, {
      ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        context: {
          layout
        }
      },
      // Let other proxies make use of the layout instance as well
      layout
    });
  }
}

LayoutProxy.propTypes = {
  nextProxy: PropTypes.shape({
    value: PropTypes.func,
    next: PropTypes.func
  }).isRequired,
  fixture: PropTypes.object.isRequired
};

export default LayoutProxy;
