import getStack from '../stack';

const introStep = {
  intro: true,
  bindings: {
    list: [
      'bear',
      'cat',
      'dog',
      'lion',
      'panda',
      'snail'
    ],
    item: 'lion'
  }
};

const steps = [
  introStep,
  {
    highlight: {
      start: 9,
      end: 33
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion'
    }
  },
  {
    highlight: {
      start: 38,
      end: 50
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0
    }
  },
  {
    highlight: {
      start: 53,
      end: 80
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5
    }
  },
  {
    highlight: {
      start: 91,
      end: 102
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5
    },
    compared: [
      'low',
      'high'
    ]
  },
  {
    highlight: {
      start: 110,
      end: 151
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5,
      mid: 3
    }
  },
  {
    highlight: {
      start: 156,
      end: 180
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5,
      mid: 3,
      guess: 'lion'
    }
  },
  {
    highlight: {
      start: 190,
      end: 204
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5,
      mid: 3,
      guess: 'lion'
    },
    compared: [
      'guess',
      'item'
    ]
  },
  {
    highlight: {
      start: 214,
      end: 225
    },
    bindings: {
      list: [
        'bear',
        'cat',
        'dog',
        'lion',
        'panda',
        'snail'
      ],
      item: 'lion',
      low: 0,
      high: 5,
      mid: 3,
      guess: 'lion'
    },
    returnValue: 3
  }
];

test('returns identical sides for intro step', () => {
  expect(getStack([introStep], 0).entries).toEqual([
    {
      prevStep: introStep,
      nextStep: introStep,
    }
  ]);
});

test('returns first two steps', () => {
  expect(getStack(steps, 0).entries).toEqual([
    {
      prevStep: steps[0],
      nextStep: steps[1],
    }
  ]);
});

test('returns last two steps', () => {
  expect(getStack(steps, steps.length - 2).entries).toEqual([
    {
      prevStep: steps[steps.length - 2],
      nextStep: steps[steps.length - 1],
    }
  ]);
});

test('returns identical sides for last step', () => {
  expect(getStack(steps, steps.length - 1).entries).toEqual([
    {
      prevStep: steps[steps.length - 1],
      nextStep: steps[steps.length - 1],
    }
  ]);
});
