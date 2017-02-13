import computeBaseLayout from './base';

export default init => {
  const base = computeBaseLayout(init);
  const {
    padding,
    borderWidth,
    blockNum,
    blockWidth,
    blockHeight,
    labelHeight,
    getRelSize,
  } = base;

  const labelTopPosition = padding;
  const itemGroupTopPosition = labelTopPosition + labelHeight + padding;
  const listBottomTopPosition = itemGroupTopPosition + padding + blockHeight;
  const illustrationHeight = listBottomTopPosition + blockHeight + padding;
  const listCenterTopPosition = (illustrationHeight / 2) - (blockHeight / 2);

  return {
    ...base,
    color: '#FFD180',
    innerWidth: ((blockWidth - borderWidth) * blockNum) + borderWidth,
    blockLabelFontSize: getRelSize(8, 2),
    labelTopPosition,
    itemGroupTopPosition,
    listBottomTopPosition,
    illustrationHeight,
    listCenterTopPosition,
  };
};
