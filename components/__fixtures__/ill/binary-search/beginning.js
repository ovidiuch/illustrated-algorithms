import BinarySearch from '../../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  prevStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'panda',
    },
    intro: true,
  },
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'panda',
    },
    highlight: {
      start: 9,
      end: 33,
    },
  },
  stepProgress: 0.5,
  onGenerateSteps: () => {},
};
