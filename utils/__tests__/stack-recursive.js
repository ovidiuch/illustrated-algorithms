import getStack from '../stack';

const introStep = {
  intro: true,
  bindings: {
    list: [
      'dog',
      'cat',
      'snail',
      'bear',
      'pig',
      'rat'
    ]
  }
};

const firstNestedStep = {
  parentStepId: 6,
  highlight: {
    start: 9,
    end: 24
  },
  bindings: {
    list: [
      'cat',
      'bear'
    ]
  }
};

const secondNestedStep = {
  parentStepId: 12,
  highlight: {
    start: 9,
    end: 24
  },
  bindings: {
    list: [
      'bear'
    ]
  }
};

const steps = [
  introStep,
  {
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ]
    }
  },
  {
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    highlight: {
      start: 76,
      end: 103
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog'
    }
  },
  {
    highlight: {
      start: 106,
      end: 147
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog',
      less: [
        'cat',
        'bear'
      ]
    }
  },
  {
    highlight: {
      start: 150,
      end: 194
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog',
      less: [
        'cat',
        'bear'
      ],
      greater: [
        'snail',
        'pig',
        'rat'
      ]
    }
  },
  {
    highlight: {
      start: 214,
      end: 229
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog',
      less: [
        'cat',
        'bear'
      ],
      greater: [
        'snail',
        'pig',
        'rat'
      ]
    }
  },
  firstNestedStep,
  {
    parentStepId: 6,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'cat',
        'bear'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 6,
    highlight: {
      start: 76,
      end: 103
    },
    bindings: {
      list: [
        'cat',
        'bear'
      ],
      pivot: 'cat'
    }
  },
  {
    parentStepId: 6,
    highlight: {
      start: 106,
      end: 147
    },
    bindings: {
      list: [
        'cat',
        'bear'
      ],
      pivot: 'cat',
      less: [
        'bear'
      ]
    }
  },
  {
    parentStepId: 6,
    highlight: {
      start: 150,
      end: 194
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
  {
    parentStepId: 6,
    highlight: {
      start: 214,
      end: 229
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
  secondNestedStep,
  {
    parentStepId: 12,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'bear'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 12,
    highlight: {
      start: 56,
      end: 68
    },
    bindings: {
      list: [
        'bear'
      ]
    },
    returnValue: [
      'bear'
    ]
  },
  {
    parentStepId: 6,
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
  {
    parentStepId: 16,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: []
    }
  },
  {
    parentStepId: 16,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: []
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 16,
    highlight: {
      start: 56,
      end: 68
    },
    bindings: {
      list: []
    },
    returnValue: []
  },
  {
    parentStepId: 6,
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
  {
    highlight: {
      start: 249,
      end: 267
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog',
      less: [
        'cat',
        'bear'
      ],
      greater: [
        'snail',
        'pig',
        'rat'
      ]
    }
  },
  {
    parentStepId: 21,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ]
    }
  },
  {
    parentStepId: 21,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 21,
    highlight: {
      start: 76,
      end: 103
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig'
    }
  },
  {
    parentStepId: 21,
    highlight: {
      start: 106,
      end: 147
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig',
      less: []
    }
  },
  {
    parentStepId: 21,
    highlight: {
      start: 150,
      end: 194
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig',
      less: [],
      greater: [
        'snail',
        'rat'
      ]
    }
  },
  {
    parentStepId: 21,
    highlight: {
      start: 214,
      end: 229
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig',
      less: [],
      greater: [
        'snail',
        'rat'
      ]
    }
  },
  {
    parentStepId: 27,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: []
    }
  },
  {
    parentStepId: 27,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: []
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 27,
    highlight: {
      start: 56,
      end: 68
    },
    bindings: {
      list: []
    },
    returnValue: []
  },
  {
    parentStepId: 21,
    highlight: {
      start: 249,
      end: 267
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig',
      less: [],
      greater: [
        'snail',
        'rat'
      ]
    }
  },
  {
    parentStepId: 31,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ]
    }
  },
  {
    parentStepId: 31,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 31,
    highlight: {
      start: 76,
      end: 103
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail'
    }
  },
  {
    parentStepId: 31,
    highlight: {
      start: 106,
      end: 147
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail',
      less: [
        'rat'
      ]
    }
  },
  {
    parentStepId: 31,
    highlight: {
      start: 150,
      end: 194
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail',
      less: [
        'rat'
      ],
      greater: []
    }
  },
  {
    parentStepId: 31,
    highlight: {
      start: 214,
      end: 229
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail',
      less: [
        'rat'
      ],
      greater: []
    }
  },
  {
    parentStepId: 36,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'rat'
      ]
    }
  },
  {
    parentStepId: 36,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'rat'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 36,
    highlight: {
      start: 56,
      end: 68
    },
    bindings: {
      list: [
        'rat'
      ]
    },
    returnValue: [
      'rat'
    ]
  },
  {
    parentStepId: 31,
    highlight: {
      start: 249,
      end: 267
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail',
      less: [
        'rat'
      ],
      greater: []
    }
  },
  {
    parentStepId: 41,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: []
    }
  },
  {
    parentStepId: 41,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: []
    },
    compared: [
      'list.length',
      '2'
    ]
  },
  {
    parentStepId: 41,
    highlight: {
      start: 56,
      end: 68
    },
    bindings: {
      list: []
    },
    returnValue: []
  },
  {
    parentStepId: 31,
    highlight: {
      start: 198,
      end: 272
    },
    bindings: {
      list: [
        'snail',
        'rat'
      ],
      pivot: 'snail',
      less: [
        'rat'
      ],
      greater: []
    },
    returnValue: [
      'rat',
      'snail'
    ]
  },
  {
    parentStepId: 21,
    highlight: {
      start: 198,
      end: 272
    },
    bindings: {
      list: [
        'snail',
        'pig',
        'rat'
      ],
      pivot: 'pig',
      less: [],
      greater: [
        'snail',
        'rat'
      ]
    },
    returnValue: [
      'pig',
      'rat',
      'snail'
    ]
  },
  {
    highlight: {
      start: 198,
      end: 272
    },
    bindings: {
      list: [
        'dog',
        'cat',
        'snail',
        'bear',
        'pig',
        'rat'
      ],
      pivot: 'dog',
      less: [
        'cat',
        'bear'
      ],
      greater: [
        'snail',
        'pig',
        'rat'
      ]
    },
    returnValue: [
      'bear',
      'cat',
      'dog',
      'pig',
      'rat',
      'snail'
    ]
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

test('returns two paused entries for last two returning steps', () => {
  const { entries, isRemovingFromStack } = getStack(steps, steps.length - 2);
  const nestedReturnStep = steps[steps.length - 2];

  expect(entries).toEqual([
    {
      prevStep: nestedReturnStep,
      nextStep: nestedReturnStep,
    },
    {
      prevStep: steps[nestedReturnStep.parentStepId],
      nextStep: steps[steps.length - 1],
    }
  ]);
  expect(isRemovingFromStack).toBe(true);
});

test('returns identical sides for last step', () => {
  expect(getStack(steps, steps.length - 1).entries).toEqual([
    {
      prevStep: steps[steps.length - 1],
      nextStep: steps[steps.length - 1],
    }
  ]);
});

test('returns two paused entries when stepping into nested call', () => {
  const index = steps.indexOf(firstNestedStep) - 1;
  const { entries, isAddingToStack } = getStack(steps, index);

  expect(entries).toEqual([
    {
      prevStep: steps[index + 1],
      nextStep: steps[index + 1],
    },
    {
      prevStep: steps[index],
      nextStep: steps[index]
    },
  ]);
  expect(isAddingToStack).toBe(true);
});

test('returns three paused entries when stepping into nested call', () => {
  const index = steps.indexOf(secondNestedStep) - 1;
  const { entries, isAddingToStack } = getStack(steps, index);

  expect(entries).toEqual([
    {
      prevStep: steps[index + 1],
      nextStep: steps[index + 1],
    },
    {
      prevStep: steps[index],
      nextStep: steps[index]
    },
    {
      prevStep: steps[steps[index].parentStepId],
      nextStep: steps[steps[index].parentStepId]
    },
  ]);
  expect(isAddingToStack).toBe(true);
});

test('returns child transition + paused parent inside 1st nested call', () => {
  const index = steps.indexOf(firstNestedStep);
  const { entries } = getStack(steps, index);

  expect(entries).toEqual([
    {
      prevStep: steps[index],
      nextStep: steps[index + 1],
    },
    {
      prevStep: steps[index - 1],
      nextStep: steps[index - 1]
    },
  ]);
});

test('returns child transition + paused parents inside 2nd nested call', () => {
  const index = steps.indexOf(secondNestedStep);
  const { entries } = getStack(steps, index);

  expect(entries).toEqual([
    {
      prevStep: steps[index],
      nextStep: steps[index + 1],
    },
    {
      prevStep: steps[index - 1],
      nextStep: steps[index - 1]
    },
    {
      prevStep: steps[steps[index - 1].parentStepId],
      nextStep: steps[steps[index - 1].parentStepId]
    }
  ]);
});
