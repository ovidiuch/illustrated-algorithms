import Quicksort from '../../../components/ill/quicksort';

const quicksort = Quicksort.algorithm;
const items = [
  'dog', 'cat', 'snail', 'bear', 'pig', 'rat'
];
const { steps } = quicksort(items);

export default {
  color: '#FFD180',
  currentPath: '/quicksort',
  steps,
  illustration: Quicksort,
};
