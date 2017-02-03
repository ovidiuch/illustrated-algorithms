import Quicksort from '../../../ill/quicksort';

export default {
  _layoutFor: Quicksort,
  prevStep: {},
  nextStep: {
    bindings: {
      list: ['dog', 'cat', 'snail', 'bear', 'pig', 'rat'],
      pivot: 'cat',
      less: ['bear'],
      greater: ['dog', 'snail', 'pig', 'rat']
    }
  },
};
