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
    intro: true,
  },
  stepProgress: 0,
  onGenerateSteps: steps => console.log('steps', steps),
};
