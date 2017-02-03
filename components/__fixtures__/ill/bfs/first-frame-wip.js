import Bfs from '../../../ill/bfs';

export default {
  _layoutFor: Bfs,
  nextStep: {
    bindings: {
      graph: {
        you: [
          'alice',
          'bob',
          'claire'
        ],
        bob: [
          'anuj',
          'peggy'
        ],
        alice: [
          'peggy'
        ],
        claire: [
          'thom',
          'jonny'
        ],
        anuj: [],
        peggy: [],
        thom: [],
        jonny: []
      },
      name: 'you'
    }
  },
};
