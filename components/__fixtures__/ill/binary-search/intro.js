export default {
  _layoutFor: 'binarySearch',
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
    intro: true,
  },
  stepProgress: 0,
  actions: {
    generateSteps: steps => console.log('steps', steps),
  },
};
