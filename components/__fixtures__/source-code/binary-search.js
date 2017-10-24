import binarySearch from '../../../algorithms/binary-search';
import SourceCode from '../../source-code';

export default {
  component: SourceCode,
  layoutFor: 'binarySearch',

  props: {
    def: binarySearch.code
  }
};
