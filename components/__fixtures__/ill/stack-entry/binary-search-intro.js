import BinarySearch from '../../../../components/ill/binary-search/binary-search';

const { code } = BinarySearch.algorithm;

export default {
  _layoutFor: BinarySearch,
  code,
  illustration: BinarySearch,
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
