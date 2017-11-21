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
        item: 'cat',
        low: 0,
        high: 2,
        mid: 1,
        guess: 'cat'
      },
      highlight: {
        start: 214,
        end: 225
      },
      returnValue: 1
    },
    nextStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'cat',
        low: 0,
        high: 2,
        mid: 1,
        guess: 'cat'
      },
      highlight: {
        start: 214,
        end: 225
      },
      returnValue: 1
    },
    stepProgress: 0
  },

  props: {
    code,
    illustration: BinarySearch,
    actions: {
      generateSteps: steps => console.log('steps', steps)
    }
  }
};
