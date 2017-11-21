import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/illustrations/binary-search/binary-search';
import StackEntry from '../../stack-entry';

const { code } = binarySearch;

export default {
  component: StackEntry,
  layoutFor: 'binarySearch',

  frameFrom: {
    prevStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      intro: true
    },
    nextStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      highlight: {
        start: 9,
        end: 33
      }
    },
    stepProgress: 0.5
  },

  props: {
    code,
    illustration: BinarySearch,
    actions: {
      generateSteps: steps => console.log('steps', steps)
    }
  }
};
