import Quicksort from '../../../ill/quicksort';

export default {
  _layoutFor: Quicksort,
  prevStep: {},
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      pivot: 'cat',
      less: ['bear'],
      greater: ['dog', 'lion', 'panda', 'snail']
    }
  },
};
