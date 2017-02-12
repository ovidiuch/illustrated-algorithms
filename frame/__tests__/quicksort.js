import getStack from '../../utils/stack';
import getQuicksortLayout from '../../layout/quicksort';
import computeQuicksortFrame from '../quicksort';

const layout = getQuicksortLayout({
  color: 'coral',
  width: 600,
  height: 400,
  code: '',
});

const steps = [
  {
    intro: true,
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
      ]
    }
  },
  {
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
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
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
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
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
      ],
      pivot: 'pineapple'
    }
  },
  {
    highlight: {
      start: 106,
      end: 147
    },
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
      ],
      pivot: 'pineapple',
      less: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'peach'
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
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
      ],
      pivot: 'pineapple',
      less: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'peach'
      ],
      greater: []
    }
  },
  {
    highlight: {
      start: 214,
      end: 229
    },
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'pineapple',
        'peach'
      ],
      pivot: 'pineapple',
      less: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'peach'
      ],
      greater: []
    },
    beforeChildCall: true
  },
  {
    parentStepId: 6,
    highlight: {
      start: 9,
      end: 24
    },
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'peach'
      ]
    }
  },
  {
    parentStepId: 6,
    highlight: {
      start: 33,
      end: 48
    },
    bindings: {
      list: [
        'cherries',
        'kiwi',
        'grapes',
        'avocado',
        'peach'
      ]
    },
    compared: [
      'list.length',
      '2'
    ]
  }
];

const stack1 = getStack(steps, 6);
const stack2 = getStack(steps, 8);

test('frame entries are reused', () => {
  const frame1 = computeQuicksortFrame(layout, stack1, 0);
  const frame2 = computeQuicksortFrame(layout, stack2, 0);

  expect(frame1.entries[1].frame).toBe(frame2.entries[1].frame);
});
