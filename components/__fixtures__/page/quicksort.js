import quicksort from '../../../algorithms/quicksort';
import Quicksort from '../../../components/ill/quicksort';
import QuicksortLayout from '../../../layout/quicksort';

const { steps } = quicksort(['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach']);

export default {
  currentPath: '/quicksort',
  algorithm: quicksort,
  illustration: Quicksort,
  Layout: QuicksortLayout,
  steps,
  actions: {},
};
