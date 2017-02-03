import Quicksort from '../../../../components/ill/quicksort';

const { code } = Quicksort.algorithm;

export default {
  _layoutFor: Quicksort,
  code,
  illustration: Quicksort,
  nextStep: {
    bindings: {
      list: ['dog', 'cat', 'snail', 'bear', 'pig', 'rat']
    },
  },
  stepProgress: 0,
  onGenerateSteps: steps => console.log('steps', steps),
};
