import Bfs from '../../../components/ill/bfs';

const bfs = Bfs.algorithm;
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
const { steps } = bfs(graph, 'you');

export default {
  currentPath: '/bfs',
  steps,
  illustration: Bfs,
};
