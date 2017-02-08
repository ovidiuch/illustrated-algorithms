import computeBaseLayout, { getListItemLeftPosition } from './base';

export const getNumberVarTopPosition = (layout, level) => {
  const {
    padding,
    numberVarHeight,
  } = layout;

  return (numberVarHeight * level) + (padding * (level + 1)) + padding;
};

export default init => {
  const base = computeBaseLayout(init);
  const {
    padding,
    blockNum,
    borderWidth,
    blockWidth,
    blockHeight,
    numberVarHeight,
  } = base;

  const innerWidth = ((blockWidth - borderWidth) * blockNum) + borderWidth;

  const listTopPosition = getNumberVarTopPosition(base, 3);
  const centerPosition = getListItemLeftPosition(base, 3) + (borderWidth / 2);

  const comparisonTopPosition = listTopPosition + blockHeight + padding;
  const comparisonLeftPosition = centerPosition - (numberVarHeight / 2);

  const itemTopPosition = comparisonTopPosition + numberVarHeight + padding;
  const itemLeftPosition = centerPosition - (blockWidth / 2);

  const illustrationHeight = itemTopPosition + blockHeight + (padding * 2);

  return {
    ...base,
    color: '#FF8A80',
    innerWidth,

    listTopPosition,
    centerPosition,

    comparisonTopPosition,
    comparisonLeftPosition,

    itemTopPosition,
    itemLeftPosition,

    illustrationHeight,
  };
};
