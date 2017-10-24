import bfs from '../../../algorithms/bfs';
import SourceCode from '../../source-code';

export default {
  component: SourceCode,
  layoutFor: 'bfs',

  props: {
    def: bfs.code
  }
};
