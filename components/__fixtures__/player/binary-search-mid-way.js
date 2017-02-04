import binarySearch from '../../../algorithms/binary-search';
import BinarySearch from '../../../components/ill/binary-search/binary-search';

const { steps } = binarySearch(BinarySearch.initialData.list, 'dog');

export default {
  _layoutFor: BinarySearch,
  code: binarySearch.code,
  illustration: BinarySearch,
  state: {
    pos: 425.27999999999804,
    isPlaying: false,
    steps: [{
      intro: true,
      bindings: {
        ...BinarySearch.initialData,
      },
    }, ...steps],
  }
};
