import {
  transitionValue,
} from '../utils/transition';

const { floor, round, max } = Math;

const IPHONE6_LANDSCAPE_WIDTH = 667;

// Values are relative to a base width of 320px
const FRAME_OF_REFERENCE = 320;
const PADDING = 4;
const BORDER_WIDTH = 1;
const CODE_FONT_SIZE = 10;
const CODE_LINE_HEIGHT = 12;

const roundToMultiOf = (value, multiOf) =>
  multiOf === undefined ? value : multiOf * round(value / multiOf);

export const getStackEntryHeight = layout => {
  const {
    landscape,
    illustrationHeight,
    codeHeight,
  } = layout;

  return landscape ? max(illustrationHeight, codeHeight) : illustrationHeight + codeHeight;
};

export const getContentHeight = (layout, stackLength) => {
  return getStackEntryHeight(layout) * stackLength;
};

export const getContentTopOffset = (layout, stackLength) => {
  const {
    availableContentHeight,
  } = layout;
  const contentHeight = getContentHeight(layout, stackLength);

  return max(0, round((availableContentHeight - contentHeight) / 2));
};

export const getListItemLeftPosition = (layout, itemIndex) => {
  const {
    borderWidth,
    blockWidth,
  } = layout;

  return (blockWidth - borderWidth) * itemIndex;
};

const getOpacityForStackDepth = level => {
  return level > 0 ? 0.5 : 1;
};

export const computeStackFrame = (layout, stack, stepProgress) => {
  const { entries, isAddingToStack, isRemovingFromStack } = stack;
  const { length } = entries;

  const entryHeight = getStackEntryHeight(layout);
  const height = getContentHeight(layout, length);

  let top;
  let topStackEntryOpacity;

  if (isAddingToStack) {
    top = transitionValue(
      getContentTopOffset(layout, length - 1) - entryHeight,
      getContentTopOffset(layout, length),
      stepProgress
    );
    topStackEntryOpacity = transitionValue(0, 1, stepProgress);
  } else if (isRemovingFromStack) {
    top = transitionValue(
      getContentTopOffset(layout, length),
      getContentTopOffset(layout, length - 1) - entryHeight,
      stepProgress
    );
    topStackEntryOpacity = transitionValue(1, 0, stepProgress);
  } else {
    top = getContentTopOffset(layout, length);
    topStackEntryOpacity = 1;
  }

  return {
    stack: {
      top,
      height,
    },
    entryHeight,
    entries: entries.map(({ prevStep, nextStep }, i) => {
      if (i === 0) {
        return topStackEntryOpacity;
      }

      if (isAddingToStack) {
        return transitionValue(
          getOpacityForStackDepth(i - 1),
          getOpacityForStackDepth(i),
          stepProgress,
        );
      }

      if (isRemovingFromStack) {
        return transitionValue(
          getOpacityForStackDepth(i),
          getOpacityForStackDepth(i - 1),
          stepProgress,
        );
      }

      return getOpacityForStackDepth(i);
    }).map(opacity => ({ opacity }))
  };
};

export default init => {
  const {
    width,
    height,
    code
  } = init;

  const color = '#fff';

  const landscape = width >= IPHONE6_LANDSCAPE_WIDTH && width > height;
  const sideWidth = landscape ? floor(width / 2) : width;

  const getRelSize = (baseValue, multiOf) =>
    roundToMultiOf(baseValue / FRAME_OF_REFERENCE * sideWidth, multiOf);

  const headerHeight = getRelSize(32, 2);
  const footerHeight = getRelSize(40, 2);

  const padding = getRelSize(PADDING, 2);
  const borderWidth = getRelSize(BORDER_WIDTH, 1);

  const codeLineHeight = getRelSize(CODE_LINE_HEIGHT, 2);

  const blockNum = 6;
  const blockWidth = floor((sideWidth - (padding * 2)) / blockNum);
  const blockLabelHeight = getRelSize(16, 2);

  return {
    ...init,
    color,

    landscape: width >= IPHONE6_LANDSCAPE_WIDTH && width > height,
    sideWidth: landscape ? floor(width / 2) : width,
    getRelSize,

    headerHeight,
    headerLinkFontSize: getRelSize(12, 2),
    headerLinkMargin: getRelSize(10),
    footerHeight,
    footerButtonIconSize: getRelSize(32, 2),
    footerHintFontSize: getRelSize(16, 2),
    availableContentHeight: height - headerHeight - footerHeight,

    padding,
    borderWidth,

    codeFontSize: getRelSize(CODE_FONT_SIZE, 2),
    codeLineHeight,
    codeHeight: (codeLineHeight * code.split('\n').length) + (padding * 2),

    blockNum,
    blockWidth,
    blockLabelFontSize: getRelSize(10, 2),
    blockLabelHeight,
    blockHeight: blockWidth + blockLabelHeight,

    numberVarWidth: blockWidth,
    numberVarHeight: getRelSize(24, 2),

    labelWidth: blockWidth,
    labelHeight: getRelSize(24, 2),
    labelFontSize: getRelSize(10, 2),

    // YO: Calculate this and override in subclasses
    illustrationHeight: 0,
  };
};
