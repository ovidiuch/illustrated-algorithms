import BinarySearch from '../../../../components/ill/binary-search/binary-search';

const { code } = BinarySearch.algorithm;

export default {
  _layoutFor: BinarySearch,
  code,
  illustration: BinarySearch,
  prevStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'cat',
      low: 0,
      high: 2,
      mid: 1,
      guess: 'cat',
    },
    highlight: {
      start: 156,
      end: 180,
    },
  },
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
      item: 'cat',
      low: 0,
      high: 2,
      mid: 1,
      guess: 'cat',
    },
    highlight: {
      start: 190,
      end: 204,
    },
    compared: ['guess', 'item'],
  },
  stepProgress: 0.65,
  onGenerateSteps: steps => console.log('steps', steps),
};
