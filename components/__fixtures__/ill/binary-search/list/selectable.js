import BinarySearch from '../../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
    },
    intro: true,
  },
  stepProgress: 0,
  onSelect: i => console.log('select', i),
};
