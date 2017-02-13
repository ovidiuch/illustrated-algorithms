import {
  transitionValue,
  transitionValues,
} from '../utils/transition';
import { retrieveFromCache, addToCache } from '../utils/cache';
import { getListItemLeftPosition } from '../layout/base';
import computeBaseFrame from '../frame/base';

const createBinaryBindingGetter = binding =>
  step => step && step.bindings[binding] !== undefined && step.returnValue === undefined ? 1 : 0;

const createTransitionGetter = (bindingGetter, transitioner) =>
  (prevStep, nextStep, stepProgress, ...args) =>
    transitioner(
      bindingGetter(prevStep, ...args),
      bindingGetter(nextStep, ...args), stepProgress);

const getTransPivotOpacity = createTransitionGetter(
  createBinaryBindingGetter('pivot'), transitionValue);
const getTransLessOpacity = createTransitionGetter(
  createBinaryBindingGetter('less'), transitionValue);
const getTransGreaterOpacity = createTransitionGetter(
  createBinaryBindingGetter('greater'), transitionValue);

const getLabelScaleForOpacity = opacity => 0.9 + (opacity * 0.1);

const getSubListItemLeftPosition = (layout, itemIndex, itemNum) => {
  const {
    blockNum,
    blockWidth,
    borderWidth,
  } = layout;

  return (
    getListItemLeftPosition(layout, itemIndex) +
    ((blockNum - itemNum) * (blockWidth - borderWidth) / 2)
  );
};

const isHighlightAt = ({ highlight }, at) => {
  return highlight && highlight.start === at;
};

// XXX: This breaks if source changes!
const startCharOfLessCall = 214;
const startCharOfGresterCall = 249;

const isCallingLess = step => isHighlightAt(step, startCharOfLessCall);
const isCallingGreater = step => isHighlightAt(step, startCharOfGresterCall);

const hasLessResult = ({ highlight, afterChildCall }) => (
  highlight.start > startCharOfLessCall ||
  (highlight.start === startCharOfLessCall && afterChildCall)
);

const hasGreaterResult = ({ highlight, afterChildCall }) => (
  highlight.start > startCharOfGresterCall ||
  (highlight.start === startCharOfGresterCall && afterChildCall)
);

const getLessGlow = step => isCallingLess(step) ? 0.8 : 0;
const getGreaterGlow = step => isCallingGreater(step) ? 0.8 : 0;

const getTransLessGlow = createTransitionGetter(getLessGlow, transitionValue);
const getTransGreaterGlow = createTransitionGetter(getGreaterGlow, transitionValue);

const getGroupItemProps = (layout, baseLeftPosition, group, item) => {
  const {
    blockWidth,
    itemGroupTopPosition
  } = layout;

  const index = group.indexOf(item);
  const center = (group.length / 2) - 0.5;
  const distanceFromCenter = index - center;
  const rotation = -distanceFromCenter * 10;

  return {
    left: baseLeftPosition + (distanceFromCenter * (blockWidth / 3)),
    top: itemGroupTopPosition,
    rotation,
  };
};

const getItemProps = (step, layout, name) => {
  const {
    bindings,
    returnValue,
  } = step;
  const {
    itemGroupTopPosition,
    listBottomTopPosition,
    listCenterTopPosition,
  } = layout;

  const {
    list,
    pivot,
    less,
    greater,
  } = bindings;
  const index = list.indexOf(name);

  if (returnValue !== undefined) {
    const sortedList = list.concat().sort();
    const sortedIndex = sortedList.indexOf(name);

    return {
      left: getSubListItemLeftPosition(layout, sortedIndex, list.length),
      top: listCenterTopPosition,
      rotation: 0,
      index: sortedIndex,
      glow: 0
    };
  } else if (name === pivot) {
    return {
      left: getListItemLeftPosition(layout, 2.5),
      top: itemGroupTopPosition,
      rotation: 0,
      index,
      glow: 0
    };
  } else if (less && less.includes(name)) {
    const subList = hasLessResult(step) ? less.concat().sort() : less;
    const subIndex = subList.indexOf(name);

    return {
      ...getGroupItemProps(layout, getListItemLeftPosition(layout, 0.5), subList, name),
      index: subIndex,
      glow: getLessGlow(step),
    };
  } else if (greater && greater.includes(name)) {
    const subList = hasGreaterResult(step) ? greater.concat().sort() : greater;
    const subIndex = subList.indexOf(name);

    return {
      ...getGroupItemProps(layout, getListItemLeftPosition(layout, 4.5), subList, name),
      index: subIndex,
      glow: getGreaterGlow(step),
    };
  }

  return {
    left: getSubListItemLeftPosition(layout, index, list.length),
    top: list.length > 1 ? listBottomTopPosition : listCenterTopPosition,
    rotation: 0,
    glow: 0,
    index,
  };
};

const getTransItemProps = createTransitionGetter(getItemProps, transitionValues);

const getIntroOpacity = step => step.intro ? 1 : 0;
const getTransIntroOpacity = createTransitionGetter(getIntroOpacity, transitionValue);

const isFinalStep = (step, { blockNum }) => step.bindings.list.length === blockNum && step.returnValue !== undefined;

const getOutroOpacity = (step, layout) => isFinalStep(step, layout) ? 1 : 0;
const getTransOutroOpacity = createTransitionGetter(getOutroOpacity, transitionValue);

const isLessEmpty = ({ bindings }) => bindings.less && bindings.less.length === 0;
const isGreaterEmpty = ({ bindings }) => bindings.greater && bindings.greater.length === 0;
const isListEmpty = ({ bindings }) => bindings.list && bindings.list.length === 0;

const computeEntryFrame = ({
  baseFrame,
  layout,
  prevStep,
  nextStep,
  stepProgress
}) => {
  const {
    padding,
    illustrationHeight,
    getRelSize,
  } = layout;

  const titleFontSize = getRelSize(24, 2);
  const titleLineHeight = getRelSize(28, 2);

  const pivotOpacity = getTransPivotOpacity(prevStep, nextStep, stepProgress);
  const lessOpacity = getTransLessOpacity(prevStep, nextStep, stepProgress);
  const greaterOpacity = getTransGreaterOpacity(prevStep, nextStep, stepProgress);

  const pivot = {
    left: getListItemLeftPosition(layout, 2.5),
    opacity: pivotOpacity,
    scale: getLabelScaleForOpacity(pivotOpacity),
  };
  const less = {
    left: getListItemLeftPosition(layout, 0.5),
    opacity: lessOpacity,
    scale: getLabelScaleForOpacity(lessOpacity),
  };
  const greater = {
    left: getListItemLeftPosition(layout, 4.5),
    opacity: greaterOpacity,
    scale: getLabelScaleForOpacity(greaterOpacity),
  };

  const lessEmpty = {
    opacity: isLessEmpty(nextStep) ? lessOpacity : 0,
    glow: getTransLessGlow(prevStep, nextStep, stepProgress),
  };
  const greaterEmpty = {
    opacity: isGreaterEmpty(nextStep) ? greaterOpacity : 0,
    glow: getTransGreaterGlow(prevStep, nextStep, stepProgress),
  };
  const listEmptyOpacity = isListEmpty(nextStep) ? 1 : 0;

  const itemPositions = nextStep.bindings.list.reduce((positions, name) => {
    positions[name] = getTransItemProps(prevStep, nextStep, stepProgress, layout, name);
    return positions;
  }, {});

  return {
    ...baseFrame,
    intro: {
      titleFontSize,
      titleLineHeight,
      btnTop: (titleLineHeight * 2) + getRelSize(10),
      btnFontSize: getRelSize(18, 2),
      btnSvgSize: getRelSize(20, 2),
      opacity: getTransIntroOpacity(prevStep, nextStep, stepProgress),
      areControlsEnabled: stepProgress === 0,
    },
    outro: {
      titleFontSize,
      titleLineHeight,
      titleTop: padding * 2,
      subtextFontSize: getRelSize(18, 2),
      subtextTop: illustrationHeight * 0.75,
      opacity: getTransOutroOpacity(prevStep, nextStep, stepProgress, layout),
    },
    pivot,
    less,
    greater,
    lessEmpty,
    greaterEmpty,
    listEmptyOpacity,
    itemPositions,
  };
};

// Memoizing entry frames speeds up the initial calculation of frames, but also
// helps StackEntry components avoid useless renders because identical entry
// frames will also share identity
// TODO: Flush this when leaving viz
const _cache = new Map();

export default (layout, stack, stepProgress) => {
  const baseFrame = computeBaseFrame(layout, stack, stepProgress);
  const entries = stack.entries.map(({ prevStep, nextStep }, i) => {
    const baseEntry = baseFrame.entries[i];
    const entryStepProgress = nextStep === prevStep ? 0 : stepProgress;
    const cacheFields = [layout, prevStep, nextStep, entryStepProgress];
    let entryFrame = retrieveFromCache(_cache, ...cacheFields);

    if (!entryFrame) {
      entryFrame = computeEntryFrame({
        baseFrame: baseEntry.frame,
        layout,
        prevStep,
        nextStep,
        stepProgress: entryStepProgress,
      });
      addToCache(_cache, entryFrame, ...cacheFields);
    }

    return {
      ...baseEntry,
      frame: entryFrame,
    };
  });

  return {
    ...baseFrame,
    entries,
  };
};
