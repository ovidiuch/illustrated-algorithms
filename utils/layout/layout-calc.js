const { floor, round } = Math;

const IPHONE6_LANDSCAPE_WIDTH = 667;

// Values are relative to a base width of 320px
const FRAME_OF_REFERENCE = 320;
const PADDING = 4;
const BORDER_WIDTH = 1;
const CODE_FONT_SIZE = 10;
const CODE_LINE_HEIGHT = 12;

export default class LayoutCalc {
  constructor(initial) {
    Object.keys(initial).forEach(attr => {
      this[attr] = initial[attr];
    });
    const {
      width,
      height,
      code,
    } = this;

    // Header and footer have fixed sizes, same on all res
    this.headerHeight = 18;
    this.footerHeight = 18;
    this.contentHeight = height - this.headerHeight - this.footerHeight;

    this.landscape = width >= IPHONE6_LANDSCAPE_WIDTH && width > height;
    this.sideWidth = this.landscape ? floor(width / 2) : width;

    this.padding = round(this.getRelSize(PADDING));
    this.borderWidth = round(this.getRelSize(BORDER_WIDTH));

    this.codeFontSize = floor(this.getRelSize(CODE_FONT_SIZE));
    this.codeLineHeight = floor(this.getRelSize(CODE_LINE_HEIGHT));
    this.codeHeight = (this.codeLineHeight * code.split('\n').length) + (this.padding * 2);

    // YO: Calculate this and override in subclasses
    this.illustrationHeight = 0;
  }

  getRelSize(baseValue) {
    return baseValue / FRAME_OF_REFERENCE * this.sideWidth;
  }
}
