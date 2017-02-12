import {
  transitionValue,
} from '../utils/transition';

const { round, max } = Math;

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

const getTopStackEntryOpacity = (stack, stepProgress) => {
  const { isAddingToStack, isRemovingFromStack } = stack;

  if (isAddingToStack) {
    return transitionValue(0, 1, stepProgress);
  }

  if (isRemovingFromStack) {
    return transitionValue(1, 0, stepProgress);
  }

  return 1;
};

const getTransOpacityForStackEntry = (stack, entryIndex, stepProgress) => {
  const { isAddingToStack, isRemovingFromStack } = stack;

  if (entryIndex === 0) {
    return getTopStackEntryOpacity(stack, stepProgress);
  }

  if (isAddingToStack) {
    return transitionValue(
      getOpacityForStackDepth(entryIndex - 1),
      getOpacityForStackDepth(entryIndex),
      stepProgress,
    );
  }

  if (isRemovingFromStack) {
    return transitionValue(
      getOpacityForStackDepth(entryIndex),
      getOpacityForStackDepth(entryIndex - 1),
      stepProgress,
    );
  }

  return getOpacityForStackDepth(entryIndex);
};

const getStackTopPosition = (layout, stack, stepProgress) => {
  const { entries, isAddingToStack, isRemovingFromStack } = stack;
  const { length } = entries;
  const entryHeight = getStackEntryHeight(layout);

  if (isAddingToStack) {
    return transitionValue(
      getContentTopOffset(layout, length - 1) - entryHeight,
      getContentTopOffset(layout, length),
      stepProgress
    );
  }

  if (isRemovingFromStack) {
    return transitionValue(
      getContentTopOffset(layout, length),
      getContentTopOffset(layout, length - 1) - entryHeight,
      stepProgress
    );
  }

  return getContentTopOffset(layout, length);
};

export default (layout, stack, stepProgress) => {
  const { entries } = stack;
  const { length } = entries;

  const top = getStackTopPosition(layout, stack, stepProgress);
  const height = getContentHeight(layout, length);
  const entryHeight = getStackEntryHeight(layout);

  return {
    stack: {
      top,
      height,
    },
    entryHeight,
    entries: entries.map(({ nextStep }, i) => {
      const {
        parentStepId,
        highlight,
        bindings,
        returnValue,
      } = nextStep;

      return {
        // Tieing stack entry elements to their parent step id will preserve
        // their DOM nodes when other entries are added to or removed from stack
        entryId: parentStepId || 0,
        opacity: getTransOpacityForStackEntry(stack, i, stepProgress),
        frame: {
          highlight,
          bindings,
          returnValue,
        }
      };
    }),
  };
};
