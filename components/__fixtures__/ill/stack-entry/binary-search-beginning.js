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
    highlight: {
      start: 9,
      end: 33,
    },
  },
  stepProgress: 0.5,
  onGenerateSteps: steps => console.log('steps', steps),
};
