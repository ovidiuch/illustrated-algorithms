export default {
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
      highlight: {
        start: 9,
        end: 33
      }
    },
    stepProgress: 0.5
  },
  props: {
    actions: {}
  }
};
