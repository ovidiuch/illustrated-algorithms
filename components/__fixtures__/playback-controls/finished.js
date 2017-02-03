import BinarySearch from '../../ill/binary-search/binary-search';

export default {
  _layoutFor: BinarySearch,
  isPlaying: false,
  pos: 1229,
  maxPos: 1229,
  onPlay: () => console.log('play'),
  onPause: () => console.log('pause'),
  onScrollTo: to => console.log('scroll', to),
};
