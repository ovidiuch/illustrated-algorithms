const { floor, round, max } = Math;

const IPHONE6_LANDSCAPE_WIDTH = 667;

// Values are relative to a base width of 320px
const FRAME_OF_REFERENCE = 320;
const PADDING = 4;
const BORDER_WIDTH = 1;
const CODE_FONT_SIZE = 10;
const CODE_LINE_HEIGHT = 12;

export default class BaseLayout {
  constructor(initial) {
    Object.keys(initial).forEach(attr => {
      this[attr] = initial[attr];
    });
    const {
      width,
      height,
      code,
    } = this;

    this.color = '#fff';

    this.landscape = width >= IPHONE6_LANDSCAPE_WIDTH && width > height;
    this.sideWidth = this.landscape ? floor(width / 2) : width;

    this.headerHeight = this.getRelSize(32, 2);
    this.headerLinkFontSize = this.getRelSize(12, 2);
    this.headerLinkMargin = this.getRelSize(10);
    this.footerHeight = this.getRelSize(40, 2);
    this.footerButtonIconSize = this.getRelSize(32, 2);
    this.footerHintFontSize = this.getRelSize(16, 2);
    this.availableContentHeight = height - this.headerHeight - this.footerHeight;

    this.padding = this.getRelSize(PADDING, 2);
    this.borderWidth = this.getRelSize(BORDER_WIDTH, 1);

    this.codeFontSize = this.getRelSize(CODE_FONT_SIZE, 2);
    this.codeLineHeight = this.getRelSize(CODE_LINE_HEIGHT, 2);
    this.codeHeight = (this.codeLineHeight * code.split('\n').length) + (this.padding * 2);

    // YO: Calculate this and override in subclasses
    this.illustrationHeight = 0;
  }

  getRelSize(baseValue, multiplierOf) {
    const rawValue = baseValue / FRAME_OF_REFERENCE * this.sideWidth;
    return multiplierOf === undefined ? rawValue : multiplierOf * round(rawValue / multiplierOf);
  }

  getStackEntryHeight() {
    const {
      landscape,
      illustrationHeight,
      codeHeight,
    } = this;

    return landscape ? max(illustrationHeight, codeHeight) : illustrationHeight + codeHeight;
  }

  getContentHeight(stackLength) {
    return this.getStackEntryHeight() * stackLength;
  }

  getContentTopOffset(stackLength) {
    const contentHeight = this.getContentHeight(stackLength);

    return max(0, round((this.availableContentHeight - contentHeight) / 2));
  }
}
