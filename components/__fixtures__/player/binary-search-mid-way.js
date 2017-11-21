import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/illustrations/binary-search/binary-search';
import computeBinarySearchFrame from '../../../frame/binary-search';
import Player from '../../player';

const list = ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'];
const { steps } = binarySearch(list, 'dog');

export default {
  component: Player,
  layoutFor: 'binarySearch',

  props: {
    computeFrame: computeBinarySearchFrame,
    algorithm: binarySearch,
    illustration: BinarySearch,
    steps: [
      {
        intro: true,
        bindings: {
          list
        }
      },
      ...steps
    ],
    actions: {
      generateSteps: item => {
        console.log('generate steps', item);
      }
    }
  },

  state: {
    pos: 425.27999999999804,
    isPlaying: false
  }
};
