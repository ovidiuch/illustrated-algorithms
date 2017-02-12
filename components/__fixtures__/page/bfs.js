import bfs from '../../../algorithms/bfs';
import RawData from '../../../components/ill/raw-data';
import computeBfsLayout from '../../../layout/bfs';
import computeRawDataFrame from '../../../frame/raw-data';

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
  computeLayout: computeBfsLayout,
  computeFrame: computeRawDataFrame,
  steps: [{
    intro: true,
    bindings: {
      graph,
      name,
    }
  }, ...steps],
  actions: {},
};
