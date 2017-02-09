import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/ill/binary-search/binary-search';

const list = ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'];

export default {
  _layoutFor: 'binarySearch',
  algorithm: binarySearch,
  illustration: BinarySearch,
  steps: [{
    intro: true,
    bindings: {
      list,
    },
  }],
  actions: {
    generateSteps: item => {
      console.log('generate steps', item);
    },
  },
};
