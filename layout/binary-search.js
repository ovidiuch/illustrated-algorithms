import BaseLayout from './base';

const { floor, round } = Math;

// Values are relative to a base width of 320px
const BLOCK_LABEL_FONT_SIZE = 10;
const BLOCK_LABEL_HEIGHT = 16;
const NUMBER_VAR_HEIGHT = 24;

// TODO: Accept as input via constructor
const BLOCK_NUM = 6;

export default class BinarySearchLayout extends BaseLayout {
  constructor(initial) {
    super(initial);

    this.blockWidth = floor((this.sideWidth - (this.padding * 2)) / BLOCK_NUM);
    this.innerWidth = ((this.blockWidth - this.borderWidth) * BLOCK_NUM) + this.borderWidth;
    this.margin = round((this.sideWidth - this.innerWidth) / 2);

    this.blockLabelFontSize = floor(this.getRelSize(BLOCK_LABEL_FONT_SIZE));
    this.blockLabelHeight = floor(this.getRelSize(BLOCK_LABEL_HEIGHT));
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.numberVarWidth = this.blockWidth;
    this.numberVarHeight = floor(this.getRelSize(NUMBER_VAR_HEIGHT));

    this.listTopPosition = this.getNumberVarTopPosition(3);
    this.centerPosition = this.getListItemLeftPosition(3) + (this.borderWidth / 2);

    this.comparisonTopPosition = this.listTopPosition + this.blockHeight + this.padding;
    this.comparisonLeftPosition = this.centerPosition - (this.numberVarHeight / 2);

    this.itemTopPosition = this.comparisonTopPosition + this.numberVarHeight + this.padding;
    this.itemLeftPosition = this.centerPosition - (this.blockWidth / 2);

    this.illustrationHeight = this.itemTopPosition + this.blockHeight + this.padding;
  }

  getNumberVarTopPosition(level) {
    return (this.numberVarHeight * level) + (this.padding * (level + 1));
  }

  getListItemLeftPosition(itemIndex) {
    return (this.blockWidth - this.borderWidth) * itemIndex;
  }
}
