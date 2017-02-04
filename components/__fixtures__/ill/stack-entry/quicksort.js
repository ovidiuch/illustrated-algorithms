import Quicksort from '../../../../components/ill/quicksort';

const { code } = Quicksort.algorithm;

export default {
  _layoutFor: Quicksort,
  code,
  illustration: Quicksort,
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail']
    },
  },
  stepProgress: 0,
  onGenerateSteps: steps => console.log('steps', steps),
};
