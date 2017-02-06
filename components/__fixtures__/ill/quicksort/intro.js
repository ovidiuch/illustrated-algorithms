import Quicksort from '../../../ill/quicksort';

export default {
  _layoutFor: Quicksort,
  prevStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail']
    },
    intro: true,
  },
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail']
    }
  },
  stepProgress: 0,
};
