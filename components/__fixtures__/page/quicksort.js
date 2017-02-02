import quicksort from '../../../algorithms/quicksort';
import RawData from '../../../components/ill/raw-data';

const items = [
  'dog', 'cat', 'snail', 'bear', 'pig', 'rat'
];
const { steps } = quicksort(items);

export default {
  color: '#FFD180',
  currentPath: '/quicksort',
  code: quicksort.code,
  steps,
  illustration: RawData,
};
