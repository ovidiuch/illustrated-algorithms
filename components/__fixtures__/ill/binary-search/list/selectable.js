export default {
  nextStep: {
    bindings: {
      list: ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'],
    },
    intro: true,
  },
  stepProgress: 0,
  onSelect: i => console.log('select', i),
};
