import quicksort from '../../../../algorithms/quicksort';
import RawData from '../../../../components/ill/raw-data';

export default {
  code: quicksort.code,
  illustration: RawData,
  nextStep: {
    bindings: {
      list: ['dog', 'cat', 'snail', 'bear', 'pig', 'rat']
    },
  },
  stepProgress: 0,
  onGenerateSteps: steps => console.log('steps', steps),
};
