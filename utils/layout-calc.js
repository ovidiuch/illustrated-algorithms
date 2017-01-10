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

export class LayoutCalc {
  constructor(sizes) {
    this.sizes = sizes;
  }

  getInnerWidth() {
    return round(this.sizes.sideWidth * PX_RATIOS.INNER_WIDTH);
  }

  getBorderWidth() {
    return floor(this.sizes.sideWidth * PX_RATIOS.BORDER_WIDTH);
  }

  getMargin() {
    return round((this.sizes.sideWidth - this.getInnerWidth()) / 2);
  }

  getPadding() {
    return round(this.sizes.sideWidth * PX_RATIOS.PADDING);
  }

  getBlockWidth() {
    return floor((this.getInnerWidth() - this.getBorderWidth()) / BLOCK_NUM) + this.getBorderWidth();
  }

  getBlockLabelFontSize() {
    return floor(this.sizes.sideWidth * PX_RATIOS.BLOCK_LABEL_FONT_SIZE);
  }

  getBlockLabelHeight() {
    return floor(this.sizes.sideWidth * PX_RATIOS.BLOCK_LABEL_HEIGHT);
  }

  getBlockHeight() {
    return this.getBlockWidth() + this.getBlockLabelHeight();
  }

  getNumberVarWidth() {
    return this.getBlockWidth();
  }

  getNumberVarHeight() {
    return floor(this.sizes.sideWidth * PX_RATIOS.NUMBER_VAR_HEIGHT);
  }
}

export class BinarySearchLayoutCalc extends LayoutCalc {
  getNumberVarTopPosition(level) {
    return (this.getNumberVarHeight() * level) + (this.getPadding() * (level + 1));
  }

  getListTopPosition() {
    return this.getNumberVarTopPosition(3);
  }

  getListItemLeftPosition(itemIndex) {
    return (this.getBlockWidth() - this.getBorderWidth()) * itemIndex;
  }

  getCenterPosition() {
    return this.getListItemLeftPosition(3) + (this.getBorderWidth() / 2);
  }

  getComparisonTopPosition() {
    return this.getListTopPosition() + this.getBlockHeight() + this.getPadding();
  }

  getComparisonLeftPosition() {
    return this.getCenterPosition() - (this.getNumberVarHeight() / 2);
  }

  getItemTopPosition() {
    return this.getComparisonTopPosition() + this.getNumberVarHeight() + this.getPadding();
  }

  getItemLeftPosition() {
    return this.getCenterPosition() - (this.getBlockWidth() / 2);
  }

  getHeight() {
    return (
      this.getItemTopPosition() +
      this.getBlockHeight() +
      this.getPadding()
    );
  }
}
