import Quicksort from '../../../illustrations/quicksort/quicksort';

export default {
  component: Quicksort,
  layoutFor: 'quicksort',

  frameFrom: {
    prevStep: {
      bindings: {
        list: ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach']
      },
      intro: true
    },
    nextStep: {
      bindings: {
        list: ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach']
      }
    },
    stepProgress: 0
  },

  props: {
    actions: {
      shuffleInput: () => console.log('shuffle input'),
      generateSteps: cb => {
        console.log('generate steps');
        cb();
      },
      play: () => console.log('play')
    }
  }
};
