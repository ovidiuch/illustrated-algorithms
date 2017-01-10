import LayoutCalc from './layout-calc';

export default class BinarySearchLayoutCalc extends LayoutCalc {
  constructor(initial) {
    super(initial);

    this.listTopPosition = this.getNumberVarTopPosition(3);
    this.centerPosition = this.getListItemLeftPosition(3) + (this.borderWidth / 2);
    this.comparisonTopPosition = this.listTopPosition + this.blockHeight + this.padding;
    this.comparisonLeftPosition = this.centerPosition - (this.numberVarHeight / 2);
    this.itemTopPosition = this.comparisonTopPosition + this.numberVarHeight + this.padding;
    this.itemLeftPosition = this.centerPosition - (this.blockWidth / 2);

    this.height = this.itemTopPosition + this.blockHeight + this.padding;
  }

  getNumberVarTopPosition(level) {
    return (this.numberVarHeight * level) + (this.padding * (level + 1));
  }

  getListItemLeftPosition(itemIndex) {
    return (this.blockWidth - this.borderWidth) * itemIndex;
  }
}
