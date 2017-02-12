import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/ill/binary-search/binary-search';

const { code } = binarySearch;

export default {
  _layoutFor: 'binarySearch',
  _frameFrom: {
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
        start: 190,
        end: 204,
      },
      compared: ['guess', 'item'],
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
        start: 214,
        end: 225,
      },
      returnValue: 1,
    },
    stepProgress: 0.65,
  },
  code,
  illustration: BinarySearch,
  actions: {
    generateSteps: steps => console.log('steps', steps),
  },
};
