import offsetSteps from '../../../utils/offset-steps';
import quicksort from '../../../algorithms/quicksort';
import Quicksort from '../../../components/illustrations/quicksort/quicksort';
import computeQuicksortFrame from '../../../frame/quicksort';
import Player from '../../player';

export default {
  component: Player,
  layoutFor: 'quicksort',

  props: {
    computeFrame: computeQuicksortFrame,
    algorithm: quicksort,
    illustration: Quicksort,
    steps: [
      {
        intro: true,
        bindings: {
          list: ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach']
        }
      },
      ...offsetSteps(
        [
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
            compared: ['list.length', '2']
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
              pivot: 'grapes'
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
              pivot: 'grapes',
              less: ['cherries', 'avocado']
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 5,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: ['cherries', 'avocado']
            }
          },
          {
            parentStepId: 5,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: ['cherries', 'avocado']
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 5,
            highlight: {
              start: 76,
              end: 103
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries'
            }
          },
          {
            parentStepId: 5,
            highlight: {
              start: 106,
              end: 147
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado']
            }
          },
          {
            parentStepId: 5,
            highlight: {
              start: 150,
              end: 194
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            }
          },
          {
            parentStepId: 5,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            },
            beforeChildCall: true
          },
          {
            parentStepId: 11,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: ['avocado']
            }
          },
          {
            parentStepId: 11,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: ['avocado']
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 11,
            highlight: {
              start: 56,
              end: 68
            },
            bindings: {
              list: ['avocado']
            },
            returnValue: ['avocado']
          },
          {
            parentStepId: 5,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            },
            afterChildCall: true
          },
          {
            parentStepId: 5,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            },
            beforeChildCall: true
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
            compared: ['list.length', '2']
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
            parentStepId: 5,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            },
            afterChildCall: true
          },
          {
            parentStepId: 5,
            highlight: {
              start: 198,
              end: 272
            },
            bindings: {
              list: ['cherries', 'avocado'],
              pivot: 'cherries',
              less: ['avocado'],
              greater: []
            },
            returnValue: ['avocado', 'cherries']
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
            },
            afterChildCall: true
          },
          {
            highlight: {
              start: 249,
              end: 267
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 23,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach']
            }
          },
          {
            parentStepId: 23,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach']
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 23,
            highlight: {
              start: 76,
              end: 103
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi'
            }
          },
          {
            parentStepId: 23,
            highlight: {
              start: 106,
              end: 147
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: []
            }
          },
          {
            parentStepId: 23,
            highlight: {
              start: 150,
              end: 194
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            }
          },
          {
            parentStepId: 23,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 29,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: []
            }
          },
          {
            parentStepId: 29,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: []
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 29,
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
            parentStepId: 23,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            },
            afterChildCall: true
          },
          {
            parentStepId: 23,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 34,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: ['pineapple', 'peach']
            }
          },
          {
            parentStepId: 34,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: ['pineapple', 'peach']
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 34,
            highlight: {
              start: 76,
              end: 103
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach'
            }
          },
          {
            parentStepId: 34,
            highlight: {
              start: 106,
              end: 147
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: []
            }
          },
          {
            parentStepId: 34,
            highlight: {
              start: 150,
              end: 194
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            }
          },
          {
            parentStepId: 34,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 40,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: []
            }
          },
          {
            parentStepId: 40,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: []
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 40,
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
            parentStepId: 34,
            highlight: {
              start: 214,
              end: 229
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            },
            afterChildCall: true
          },
          {
            parentStepId: 34,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            },
            beforeChildCall: true
          },
          {
            parentStepId: 45,
            highlight: {
              start: 9,
              end: 24
            },
            bindings: {
              list: ['pineapple']
            }
          },
          {
            parentStepId: 45,
            highlight: {
              start: 33,
              end: 48
            },
            bindings: {
              list: ['pineapple']
            },
            compared: ['list.length', '2']
          },
          {
            parentStepId: 45,
            highlight: {
              start: 56,
              end: 68
            },
            bindings: {
              list: ['pineapple']
            },
            returnValue: ['pineapple']
          },
          {
            parentStepId: 34,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            },
            afterChildCall: true
          },
          {
            parentStepId: 34,
            highlight: {
              start: 198,
              end: 272
            },
            bindings: {
              list: ['pineapple', 'peach'],
              pivot: 'peach',
              less: [],
              greater: ['pineapple']
            },
            returnValue: ['peach', 'pineapple']
          },
          {
            parentStepId: 23,
            highlight: {
              start: 249,
              end: 267
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            },
            afterChildCall: true
          },
          {
            parentStepId: 23,
            highlight: {
              start: 198,
              end: 272
            },
            bindings: {
              list: ['kiwi', 'pineapple', 'peach'],
              pivot: 'kiwi',
              less: [],
              greater: ['pineapple', 'peach']
            },
            returnValue: ['kiwi', 'peach', 'pineapple']
          },
          {
            highlight: {
              start: 249,
              end: 267
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
            },
            afterChildCall: true
          },
          {
            highlight: {
              start: 198,
              end: 272
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
              pivot: 'grapes',
              less: ['cherries', 'avocado'],
              greater: ['kiwi', 'pineapple', 'peach']
            },
            returnValue: [
              'avocado',
              'cherries',
              'grapes',
              'kiwi',
              'peach',
              'pineapple'
            ]
          }
        ],
        1
      )
    ],
    actions: {
      shuffleInput: () => console.log('shuffle input'),
      generateSteps: cb => {
        console.log('generate steps');
        cb();
      }
    }
  }
};
