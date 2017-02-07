import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/ill/binary-search/binary-search';
import BinarySearchLayout from '../../../layout/binary-search';

const list = ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'];

export default {
  currentPath: '/binary-search',
  algorithm: binarySearch,
  illustration: BinarySearch,
  Layout: BinarySearchLayout,
  steps: [{
    bindings: { list },
    intro: true,
  }],
  actions: {
    generateSteps: item => {
      console.log('generate steps', item);
    },
  },
};
