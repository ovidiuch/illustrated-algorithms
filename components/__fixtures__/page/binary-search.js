import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/illustrations/binary-search/binary-search';
import computeBinarySearchLayout from '../../../layout/binary-search';
import computeBinarySearchFrame from '../../../frame/binary-search';
import Page from '../../page';

const list = ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'];

export default {
  component: Page,

  props: {
    currentPath: '/binary-search',
    algorithm: binarySearch,
    illustration: BinarySearch,
    computeLayout: computeBinarySearchLayout,
    computeFrame: computeBinarySearchFrame,
    steps: [
      {
        bindings: { list },
        intro: true
      }
    ],
    actions: {
      generateSteps: item => {
        console.log('generate steps', item);
      }
    }
  }
};
