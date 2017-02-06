import bfs from '../../algorithms/bfs';
import BfsLayout from '../../layout/bfs';
import RawData from './raw-data';

class Bfs extends RawData { }

Bfs.algorithm = bfs;

Bfs.Layout = BfsLayout;

Bfs.initialData = {
  graph: {
    you: ['alice', 'bob', 'claire'],
    bob: ['anuj', 'peggy'],
    alice: ['peggy'],
    claire: ['thom', 'jonny'],
    anuj: [],
    peggy: [],
    thom: [],
    jonny: [],
  },
  name: 'you'
};

export default Bfs;
