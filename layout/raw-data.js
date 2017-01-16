import BaseLayout from './base';

// Values are relative to a base width of 320px
const FONT_SIZE = 10;
const LINE_HEIGHT = 12;

export default class RawDataLayout extends BaseLayout {
  constructor(initial) {
    super(initial);

    this.fontSize = this.getRelSize(FONT_SIZE, 2);
    this.lineHeight = this.getRelSize(LINE_HEIGHT, 2);

    // Hardcoded to fit raw data from Bfs (Quicksort is smaller)
    this.illustrationHeight = this.getRelSize(164, 1);
  }
}
