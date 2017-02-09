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

  const listTop = getNumberVarTopPosition(base, 3);
  const center = getListItemLeftPosition(base, 3) + (borderWidth / 2);

  const comparison = {
    left: center - (numberVarHeight / 2),
    top: listTop + blockHeight + padding,
  };
  const item = {
    left: center - (blockWidth / 2),
    top: comparison.top + numberVarHeight + padding,
  };

  const illustrationHeight = item.top + blockHeight + (padding * 2);

  return {
    ...base,
    color: '#FF8A80',
    innerWidth,
    listTop,
    center,
    comparison,
    item,
    illustrationHeight,
  };
};
