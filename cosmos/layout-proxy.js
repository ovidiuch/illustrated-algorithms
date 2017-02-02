import React from 'react';
import binarySearch from '../algorithms/binary-search';
import BinarySearchLayout from '../layout/binary-search';

class LayoutProxy extends React.Component {
  render() {
    const {
      nextProxy,
      fixture,
    } = this.props;

    return React.createElement(nextProxy.value, { ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        context: {
          layout: new BinarySearchLayout({
            width: 1200,
            height: 600,
            code: binarySearch.code,
          }),
        },
      }
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
