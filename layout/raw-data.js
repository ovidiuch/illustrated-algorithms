import BaseLayout from './base';

const { floor } = Math;

// Values are relative to a base width of 320px
const FONT_SIZE = 10;
const LINE_HEIGHT = 12;

export default class RawDataLayout extends BaseLayout {
  constructor(initial) {
    super(initial);

    this.fontSize = floor(this.getRelSize(FONT_SIZE));
    this.lineHeight = floor(this.getRelSize(LINE_HEIGHT));

    // Hardcoded to fit raw data from Bfs (Quicksort is smaller)
    this.illustrationHeight = this.getRelSize(164);
  }
}
