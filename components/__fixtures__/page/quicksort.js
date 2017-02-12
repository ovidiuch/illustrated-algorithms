import quicksort from '../../../algorithms/quicksort';
import Quicksort from '../../../components/ill/quicksort/quicksort';
import computeQuicksortLayout from '../../../layout/quicksort';
import computeQuicksortFrame from '../../../frame/quicksort';

const list = ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach'];
const { steps } = quicksort(list);

export default {
  currentPath: '/quicksort',
  algorithm: quicksort,
  illustration: Quicksort,
  computeLayout: computeQuicksortLayout,
  computeFrame: computeQuicksortFrame,
  steps,
  actions: {},
};
