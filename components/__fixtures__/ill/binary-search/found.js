import BinarySearch from '../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  prevStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'panda',
      low: 3,
      mid: 3,
      high: 3,
      guess: 'panda',
    },
  },
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'panda',
      low: 3,
      mid: 3,
      high: 3,
      guess: 'panda',
    },
    returnValue: 4,
  },
  stepProgress: 1,
  onGenerateSteps: () => {},
};
