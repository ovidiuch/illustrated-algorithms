import quicksort from '../../../algorithms/quicksort';
import SourceCode from '../../source-code';

export default {
  component: SourceCode,
  layoutFor: 'quicksort',

  props: {
    def: quicksort.code
  }
};
