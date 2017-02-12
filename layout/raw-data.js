import computeBaseLayout from './base';

// Values are relative to a base width of 320px
const FONT_SIZE = 10;
const LINE_HEIGHT = 12;

export default init => {
  const base = computeBaseLayout(init);
  const {
    getRelSize,
  } = base;

  return {
    ...base,

    fontSize: getRelSize(FONT_SIZE, 2),
    lineHeight: getRelSize(LINE_HEIGHT, 2),
  };
};
