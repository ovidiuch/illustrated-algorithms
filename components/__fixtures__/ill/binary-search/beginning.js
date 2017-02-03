import BinarySearch from '../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'panda',
    },
    intro: true,
  },
  stepProgress: 0.5,
  onGenerateSteps: () => {},
};
