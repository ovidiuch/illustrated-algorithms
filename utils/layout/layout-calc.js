const { floor, round } = Math;

const IPHONE6_LANDSCAPE_WIDTH = 667;

// Header and footer have fixed sizes, same on all res
const HEADER_HEIGHT = 18;
const FOOTER_HEIGHT = 18;

// Content is relative to screen resolution and is calculated based on base
// values relative to a width of 320px
const FRAME_OF_REFERENCE = 320;
const PADDING = 4;
const BORDER_WIDTH = 1;
const BLOCK_LABEL_FONT_SIZE = 10;
const BLOCK_LABEL_HEIGHT = 16;
const NUMBER_VAR_HEIGHT = 24;
const CODE_FONT_SIZE = 10;

// TODO: Accept as input from each subclass
const BLOCK_NUM = 6;

export default class LayoutCalc {
  constructor(initial) {
    Object.keys(initial).forEach(attr => {
      this[attr] = initial[attr];
    });
    const {
      width,
      height,
    } = this;

    this.headerHeight = HEADER_HEIGHT;
    this.footerHeight = FOOTER_HEIGHT;
    this.contentHeight = height - this.headerHeight - this.footerHeight;

    this.landscape = width >= IPHONE6_LANDSCAPE_WIDTH && width > height;
    this.sideWidth = this.landscape ? Math.floor(width / 2) : width;

    this.padding = round(this.getRelSize(PADDING));
    this.borderWidth = round(this.getRelSize(BORDER_WIDTH));

    this.blockWidth = floor(this.getRelSize((FRAME_OF_REFERENCE - (2 * PADDING)) / BLOCK_NUM));
    this.innerWidth = ((this.blockWidth - this.borderWidth) * BLOCK_NUM) + this.borderWidth;
    this.margin = round((this.sideWidth - this.innerWidth) / 2);

    this.blockLabelFontSize = floor(this.getRelSize(BLOCK_LABEL_FONT_SIZE));
    this.blockLabelHeight = floor(this.getRelSize(BLOCK_LABEL_HEIGHT));
    this.blockHeight = this.blockWidth + this.blockLabelHeight;

    this.numberVarWidth = this.blockWidth;
    this.numberVarHeight = floor(this.getRelSize(NUMBER_VAR_HEIGHT));

    this.codeFontSize = floor(this.getRelSize(CODE_FONT_SIZE));
  }

  getRelSize(baseValue) {
    return baseValue / FRAME_OF_REFERENCE * this.sideWidth;
  }
}
