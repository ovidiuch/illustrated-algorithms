import PropTypes from 'prop-types';
import React from 'react';
import getStack from '../../utils/stack';
import computeBinarySearchFrame from '../../frame/binary-search';
import computeQuicksortFrame from '../../frame/quicksort';
import computeRawDataFrame from '../../frame/raw-data';

const frameComputers = {
  binarySearch: computeBinarySearchFrame,
  quicksort: computeQuicksortFrame,
  bfs: computeRawDataFrame
};

class FrameProxy extends React.Component {
  render() {
    const { nextProxy, fixture, layout } = this.props;
    const { layoutFor, frameFrom } = fixture;

    if (!frameFrom) {
      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next()
      });
    }

    const { prevStep, nextStep, stepProgress } = frameFrom;
    const stack = getStack([prevStep, nextStep], 0);
    const computer = frameComputers[layoutFor];
    const frame = computer(layout, stack, stepProgress).entries[0].frame;

    return React.createElement(nextProxy.value, {
      ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        props: {
          ...fixture.props,
          frame
        }
      }
    });
  }
}

FrameProxy.propTypes = {
  nextProxy: PropTypes.shape({
    value: PropTypes.func,
    next: PropTypes.func
  }).isRequired,
  fixture: PropTypes.object.isRequired,
  layout: PropTypes.object
};

FrameProxy.defaultProps = {
  layout: {}
};

export default FrameProxy;
