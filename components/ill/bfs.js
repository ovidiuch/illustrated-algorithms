import bfs from '../../algorithms/bfs';
import BfsLayout from '../../layout/bfs';
import RawData from './raw-data';

class Bfs extends RawData { }

Bfs.algorithm = bfs;

Bfs.Layout = BfsLayout;

export default Bfs;
