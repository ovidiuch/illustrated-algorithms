import Outro from '../../../../illustrations/quicksort/outro';

export default {
  component: Outro,
  layoutFor: 'quicksort',

  props: {
    frame: {
      outro: {
        titleFontSize: 46,
        titleLineHeight: 52,
        titleTop: 16,
        subtextFontSize: 34,
        subtextTop: 249,
        opacity: 1
      }
    }
  }
};
