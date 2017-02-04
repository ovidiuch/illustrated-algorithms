import Quicksort from '../../../components/ill/quicksort';

const quicksort = Quicksort.algorithm;
const items = [
  'bear', 'cat', 'dog', 'lion', 'panda', 'snail'
];
const { steps } = quicksort(items);

export default {
  color: '#FFD180',
  currentPath: '/quicksort',
  steps,
  illustration: Quicksort,
};
