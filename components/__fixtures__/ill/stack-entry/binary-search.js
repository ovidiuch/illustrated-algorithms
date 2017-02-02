import binarySearch from '../../../../algorithms/binary-search';
import BinarySearch from '../../../../components/ill/binary-search/binary-search';

export default {
  code: binarySearch.code,
  illustration: BinarySearch,
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
