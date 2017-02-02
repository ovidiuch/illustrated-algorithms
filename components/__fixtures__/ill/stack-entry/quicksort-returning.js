import quicksort from '../../../../algorithms/quicksort';
import RawData from '../../../../components/ill/raw-data';

export default {
  code: quicksort.code,
  illustration: RawData,
  prevStep: {
    parentStepId: 5,
    highlight: {
      start: 249,
      end: 267
    },
    bindings: {
      list: [
        'cat',
        'bear'
      ],
      pivot: 'cat',
      less: [
        'bear'
      ],
      greater: []
    }
  },
  nextStep: {
    parentStepId: 5,
    highlight: {
      start: 198,
      end: 272
    },
    bindings: {
      list: [
        'cat',
        'bear'
      ],
      pivot: 'cat',
      less: [
        'bear'
      ],
      greater: []
    },
    returnValue: [
      'bear',
      'cat'
    ]
  },
  stepProgress: 0.3,
  onGenerateSteps: steps => console.log('steps', steps),
};
