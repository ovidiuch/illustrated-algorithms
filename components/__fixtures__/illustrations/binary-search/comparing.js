import BinarySearch from '../../../illustrations/binary-search/binary-search';

export default {
  component: BinarySearch,
  layoutFor: 'binarySearch',

  frameFrom: {
    prevStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda',
        low: 0,
        mid: 3,
        high: 5,
        guess: 'lion'
      }
    },
    nextStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda',
        low: 0,
        mid: 3,
        high: 5,
        guess: 'lion'
      },
      compared: ['guess', 'item']
    },
    stepProgress: 0.633
  },

  props: {
    actions: {}
  }
};
