import RawData from '../../../illustrations/raw-data';

export default {
  component: RawData,
  layoutFor: 'bfs',

  frameFrom: {
    prevStep: {
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
      },
      intro: true,
    },
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
    stepProgress: 0,
  }
};
