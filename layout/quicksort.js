import {
  transitionValue,
  transitionValues,
} from '../utils/transition';
import computeBaseLayout, { getListItemLeftPosition } from './base';

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
      left: layout.pivot.left,
      top: itemGroupTopPosition,
      rotation: 0,
      index,
      glow: 0
    };
  } else if (less && less.includes(name)) {
    const subList = hasLessResult(step) ? less.concat().sort() : less;
    const subIndex = subList.indexOf(name);

    return {
      ...getGroupItemProps(layout, layout.less.left, subList, name),
      index: subIndex,
      glow: getLessGlow(step),
    };
  } else if (greater && greater.includes(name)) {
    const subList = hasGreaterResult(step) ? greater.concat().sort() : greater;
    const subIndex = subList.indexOf(name);

    return {
      ...getGroupItemProps(layout, layout.greater.left, subList, name),
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

const computeFrame = (layout, prevStep, nextStep, stepProgress) => {
  const pivotOpacity = getTransPivotOpacity(prevStep, nextStep, stepProgress);
  const lessOpacity = getTransLessOpacity(prevStep, nextStep, stepProgress);
  const greaterOpacity = getTransGreaterOpacity(prevStep, nextStep, stepProgress);

  const pivot = {
    ...layout.pivot,
    opacity: pivotOpacity,
    scale: getLabelScaleForOpacity(pivotOpacity),
  };
  const less = {
    ...layout.less,
    opacity: lessOpacity,
    scale: getLabelScaleForOpacity(lessOpacity),
  };
  const greater = {
    ...layout.greater,
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
    intro: {
      ...layout.intro,
      opacity: getTransIntroOpacity(prevStep, nextStep, stepProgress)
    },
    outro: {
      ...layout.outro,
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

  const titleFontSize = getRelSize(24, 2);
  const titleLineHeight = getRelSize(28, 2);

  const layout = {
    ...base,
    color: '#FFD180',

    innerWidth: ((blockWidth - borderWidth) * blockNum) + borderWidth,
    blockLabelFontSize: getRelSize(8, 2),

    labelTopPosition,
    itemGroupTopPosition,
    listBottomTopPosition,
    illustrationHeight,
    listCenterTopPosition,

    pivot: { left: getListItemLeftPosition(base, 2.5) },
    less: { left: getListItemLeftPosition(base, 0.5) },
    greater: { left: getListItemLeftPosition(base, 4.5) },

    intro: {
      titleFontSize,
      titleLineHeight,
      btnTop: (titleLineHeight * 2) + getRelSize(10),
      btnFontSize: getRelSize(18, 2),
      btnSvgSize: getRelSize(20, 2),
    },
    outro: {
      titleFontSize,
      titleLineHeight,
      titleTop: padding * 2,
      subtextFontSize: getRelSize(18, 2),
      subtextTop: illustrationHeight * 0.75,
    }
  };

  return {
    ...layout,
    computeFrame: (...args) => computeFrame(layout, ...args),
  };
};
