import BinarySearch from '../../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      low: 1,
      high: 3,
      guess: 'dog',
    }
  },
  stepProgress: 1,
  onSelect: () => {},
};
