import BinarySearch from '../../../illustrations/binary-search/binary-search';

export default {
  component: BinarySearch,
  layoutFor: 'binarySearch',

  frameFrom: {
    prevStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      intro: true
    },
    nextStep: {
      bindings: {
        list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
        item: 'panda'
      },
      intro: true
    },
    stepProgress: 0
  },

  props: {
    actions: {
      generateSteps: steps => console.log('steps', steps)
    }
  }
};
