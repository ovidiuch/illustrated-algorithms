export default {
  _layoutFor: 'binarySearch',
  props: {
    isPlaying: false,
    pos: 1229,
    maxPos: 1229,
    onPlay: () => console.log('play'),
    onPause: () => console.log('pause'),
    onScrollTo: to => console.log('scroll', to)
  }
};
