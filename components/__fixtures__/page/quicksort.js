import quicksort from '../../../algorithms/quicksort';
import Quicksort from '../../../components/illustrations/quicksort/quicksort';
import computeQuicksortLayout from '../../../layout/quicksort';
import computeQuicksortFrame from '../../../frame/quicksort';
import Page from '../../page';

const list = ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach'];
const { steps } = quicksort(list);

export default {
  component: Page,
  layoutFor: 'quicksort',

  props: {
    currentPath: '/quicksort',
    algorithm: quicksort,
    illustration: Quicksort,
    computeLayout: computeQuicksortLayout,
    computeFrame: computeQuicksortFrame,
    steps,
    actions: {}
  }
};
