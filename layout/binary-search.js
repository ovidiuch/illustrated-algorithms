import BaseLayout from './base';

const { floor } = Math;

// Values are relative to a base width of 320px
const BLOCK_LABEL_FONT_SIZE = 10;
const BLOCK_LABEL_HEIGHT = 16;
const NUMBER_VAR_HEIGHT = 24;

const BLOCK_NUM = 6;

export default class BinarySearchLayout extends BaseLayout {
  constructor(initial) {
    super(initial);

    this.blockWidth = floor((this.sideWidth - (this.padding * 2)) / BLOCK_NUM);
    this.innerWidth = ((this.blockWidth - this.borderWidth) * BLOCK_NUM) + this.borderWidth;

    this.blockLabelFontSize = this.getRelSize(BLOCK_LABEL_FONT_SIZE, 2);
    this.blockLabelHeight = this.getRelSize(BLOCK_LABEL_HEIGHT, 2);
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.numberVarWidth = this.blockWidth;
    this.numberVarHeight = this.getRelSize(NUMBER_VAR_HEIGHT, 2);

    this.listTopPosition = this.getNumberVarTopPosition(3);
    this.centerPosition = this.getListItemLeftPosition(3) + (this.borderWidth / 2);

    this.comparisonTopPosition = this.listTopPosition + this.blockHeight + this.padding;
    this.comparisonLeftPosition = this.centerPosition - (this.numberVarHeight / 2);

    this.itemTopPosition = this.comparisonTopPosition + this.numberVarHeight + this.padding;
    this.itemLeftPosition = this.centerPosition - (this.blockWidth / 2);

    this.illustrationHeight = this.itemTopPosition + this.blockHeight + (this.padding * 2);
  }

  getNumberVarTopPosition(level) {
    return (this.numberVarHeight * level) + (this.padding * (level + 1)) + this.padding;
  }

  getListItemLeftPosition(itemIndex) {
    return (this.blockWidth - this.borderWidth) * itemIndex;
  }
}
