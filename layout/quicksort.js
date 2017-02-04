import BaseLayout from './base';

const { floor } = Math;

// Values are relative to a base width of 320px
const BLOCK_LABEL_FONT_SIZE = 10;
const BLOCK_LABEL_HEIGHT = 16;

const BLOCK_NUM = 6;

export default class QuicksortLayout extends BaseLayout {
  constructor(initial) {
    super(initial);

    this.color = '#FFD180';

    this.blockWidth = floor((this.sideWidth - (this.padding * 2)) / BLOCK_NUM);
    this.innerWidth = ((this.blockWidth - this.borderWidth) * BLOCK_NUM) + this.borderWidth;

    this.blockLabelFontSize = this.getRelSize(BLOCK_LABEL_FONT_SIZE, 2);
    this.blockLabelHeight = this.getRelSize(BLOCK_LABEL_HEIGHT, 2);
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.illustrationHeight = (this.blockHeight * 2) + (this.padding * 3);
  }

  getListItemLeftPosition(itemIndex, itemNum) {
    return (
      ((this.blockWidth - this.borderWidth) * itemIndex) +
      ((BLOCK_NUM - itemNum) * (this.blockWidth - this.borderWidth) / 2)
    );
  }
}
