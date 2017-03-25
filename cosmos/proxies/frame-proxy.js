import React from 'react';
import getStack from '../../utils/stack';
import computeBinarySearchFrame from '../../frame/binary-search';
import computeQuicksortFrame from '../../frame/quicksort';
import computeRawDataFrame from '../../frame/raw-data';

const frameComputers = {
  binarySearch: computeBinarySearchFrame,
  quicksort: computeQuicksortFrame,
  bfs: computeRawDataFrame,
};

class FrameProxy extends React.Component {
  render() {
    const {
      nextProxy,
      fixture,
      layout,
    } = this.props;
    const {
      _layoutFor,
      _frameFrom,
    } = fixture;

    if (!_frameFrom) {
      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next(),
      });
    }

    const {
      prevStep,
      nextStep,
      stepProgress
    } = _frameFrom;
    const stack = getStack([prevStep, nextStep], 0);
    const computer = frameComputers[_layoutFor];
    const frame = computer(layout, stack, stepProgress).entries[0].frame;

    return React.createElement(nextProxy.value, {
      ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        props: {
          ...fixture.props,
          frame
        },
      },
    });
  }
}

FrameProxy.propTypes = {
  nextProxy: React.PropTypes.shape({
    value: React.PropTypes.func,
    next: React.PropTypes.func,
  }).isRequired,
  fixture: React.PropTypes.object.isRequired,
  layout: React.PropTypes.object,
};

export default () => FrameProxy;
