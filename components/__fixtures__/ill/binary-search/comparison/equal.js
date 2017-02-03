import BinarySearch from '../../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  nextStep: {
    bindings: {
      guess: 'lion',
      item: 'lion',
    },
    compared: ['guess', 'item']
  },
  stepProgress: 1,
};
