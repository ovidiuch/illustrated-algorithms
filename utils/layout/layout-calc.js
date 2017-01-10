const { floor, round } = Math;

// Frame of reference:
// - screen width: 320px
// - list of 6 blocks 52px each (48px inner width + 2px border), overlapping borders
// - content has 302px (2px for last item's right border), so 18px left for spacing
const PX_RATIOS = {
  INNER_WIDTH: 302 / 320,
  PADDING: 8 / 320,
  BORDER_WIDTH: 2 / 320,
  BLOCK_LABEL_FONT_SIZE: 10 / 320,
  BLOCK_LABEL_HEIGHT: 18 / 320,
  NUMBER_VAR_HEIGHT: 24 / 320,
};
const BLOCK_NUM = 6;

export default class LayoutCalc {
  constructor(initial) {
    Object.keys(initial).forEach(attr => {
      this[attr] = initial[attr];
    });

    this.innerWidth = round(this.sideWidth * PX_RATIOS.INNER_WIDTH);
    this.margin = round((this.sideWidth - this.innerWidth) / 2);
    this.borderWidth = floor(this.sideWidth * PX_RATIOS.BORDER_WIDTH);
    this.padding = round(this.sideWidth * PX_RATIOS.PADDING);

    this.blockWidth = floor((this.innerWidth - this.borderWidth) / BLOCK_NUM) + this.borderWidth;
    this.blockLabelFontSize = floor(this.sideWidth * PX_RATIOS.BLOCK_LABEL_FONT_SIZE);
    this.blockLabelHeight = floor(this.sideWidth * PX_RATIOS.BLOCK_LABEL_HEIGHT);
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.numberVarWidth = this.blockWidth;
    this.numberVarHeight = floor(this.sideWidth * PX_RATIOS.NUMBER_VAR_HEIGHT);
  }
}
