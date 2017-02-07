import bfs from '../../../algorithms/bfs';
import RawData from '../../../components/ill/raw-data';
import BfsLayout from '../../../layout/bfs';

const graph = {
  you: ['alice', 'bob', 'claire'],
  bob: ['anuj', 'peggy'],
  alice: ['peggy'],
  claire: ['thom', 'jonny'],
  anuj: [],
  peggy: [],
  thom: [],
  jonny: [],
};
const name = 'you';
const { steps } = bfs(graph, name);

export default {
  currentPath: '/bfs',
  algorithm: bfs,
  illustration: RawData,
  Layout: BfsLayout,
  steps: [{
    intro: true,
    bindings: {
      graph,
      name,
    }
  }, ...steps],
  actions: {},
};
