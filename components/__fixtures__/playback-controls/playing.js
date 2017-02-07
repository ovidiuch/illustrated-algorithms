export default {
  _layoutFor: 'binarySearch',
  isPlaying: true,
  pos: 300,
  maxPos: 1229,
  onPlay: () => console.log('play'),
  onPause: () => console.log('pause'),
  onScrollTo: to => console.log('scroll', to),
};
