export default {
  layoutFor: 'binarySearch',
  props: {
    isPlaying: false,
    pos: 0,
    maxPos: 1229,
    onPlay: () => console.log('play'),
    onPause: () => console.log('pause'),
    onScrollTo: to => console.log('scroll', to)
  }
};
