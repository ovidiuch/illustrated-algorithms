const { floor, round } = Math;

const BLOCK_NUM = 6;
// Frame of reference: 320px screen width
const PADDING = 4 / 320;
const BORDER_WIDTH = 1 / 320;
const BLOCK_LABEL_FONT_SIZE = 10 / 320;
const BLOCK_LABEL_HEIGHT = 16 / 320;
const NUMBER_VAR_HEIGHT = 24 / 320;

export default class LayoutCalc {
  constructor(initial) {
    Object.keys(initial).forEach(attr => {
      this[attr] = initial[attr];
    });
    const { sideWidth } = this;

    this.padding = round(sideWidth * PADDING);
    this.borderWidth = round(sideWidth * BORDER_WIDTH);

    this.blockWidth = floor((312 / 320 / BLOCK_NUM) * sideWidth);
    this.innerWidth = ((this.blockWidth - this.borderWidth) * BLOCK_NUM) + this.borderWidth;
    this.margin = round((sideWidth - this.innerWidth) / 2);

    this.blockLabelFontSize = floor(sideWidth * BLOCK_LABEL_FONT_SIZE);
    this.blockLabelHeight = floor(sideWidth * BLOCK_LABEL_HEIGHT);
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.numberVarWidth = this.blockWidth;
    this.numberVarHeight = floor(sideWidth * NUMBER_VAR_HEIGHT);
  }
}
