import Intro from '../../../../illustrations/quicksort/intro';

export default {
  component: Intro,
  layoutFor: 'quicksort',

  props: {
    frame: {
      intro: {
        titleFontSize: 38,
        titleLineHeight: 44,
        btnTop: 103.625,
        btnFontSize: 28,
        btnSvgSize: 32,
        opacity: 1
      }
    },
    onShuffle: () => console.log('shuffle'),
    onStart: () => console.log('start')
  }
};
