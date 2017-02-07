import React from 'react';

import binarySearch from '../algorithms/binary-search';
import quicksort from '../algorithms/quicksort';
import bfs from '../algorithms/bfs';
import BinarySearchLayout from '../layout/binary-search';
import QuicksortLayout from '../layout/quicksort';
import BfsLayout from '../layout/bfs';

const layoutRefs = {
  binarySearch: {
    code: binarySearch.code,
    Layout: BinarySearchLayout,
  },
  quicksort: {
    code: quicksort.code,
    Layout: QuicksortLayout,
  },
  bfs: {
    code: bfs.code,
    Layout: BfsLayout,
  },
};

class LayoutProxy extends React.Component {
  render() {
    const {
      nextProxy,
      fixture,
    } = this.props;
    const { _layoutFor } = fixture;

    if (!_layoutFor) {
      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next(),
      });
    }

    const { code, Layout } = layoutRefs[_layoutFor];
    const layout = new Layout({
      width: 1200,
      height: 600,
      code,
    });

    return React.createElement(nextProxy.value, {
      ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        context: {
          layout,
        },
      },
      // Let other proxies make use of the layout instance as well
      layout,
    });
  }
}

LayoutProxy.propTypes = {
  nextProxy: React.PropTypes.shape({
    value: React.PropTypes.func,
    next: React.PropTypes.func,
  }).isRequired,
  fixture: React.PropTypes.object.isRequired,
};

export default () => LayoutProxy;
