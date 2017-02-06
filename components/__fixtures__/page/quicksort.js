import Quicksort from '../../../components/ill/quicksort';

const quicksort = Quicksort.algorithm;
const { steps } = quicksort(Quicksort.initialData.list);

export default {
  currentPath: '/quicksort',
  steps,
  illustration: Quicksort,
};
