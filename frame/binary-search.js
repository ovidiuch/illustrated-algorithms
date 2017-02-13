import {
  transitionValue,
  transitionValues,
  getBindingValue,
} from '../utils/transition';
import getWobbleRotation from '../utils/wobble';
import { getListItemLeftPosition } from '../layout/base';
import { getNumberVarTopPosition } from '../layout/binary-search';
import computeBaseFrame from '../frame/base';

const getIntroOpacity = step => step.intro ? 1 : 0;

const LIST_BASE_ROTATIONS = [-0.9, -0.4, 1.4, 0.5, -1.35, 1];

const getListItemOpacity = (index, step) => {
  const {
    low,
    high,
  } = step.bindings;

  const isIncluded = (
    (low === undefined || high === undefined) ||
    (index >= low && index <= high)
  );

  return isIncluded ? 1 : 0.2;
};

const getListItemGlow = (name, step) => step.bindings.guess === name ? 0.4 : 0;

const ITEM_BASE_ROTATION = -1.5;

const getItemOpacity = step => !step.intro && step.bindings.item !== undefined ? 1 : 0;

const varTopPos = {
  low: 0,
  high: 1,
  mid: 2,
};

const getVarProps = (step, layout, binding) => {
  const value = step.bindings[binding];
  const isPresent = value !== undefined;

  if (!isPresent) {
    return { opacity: 0 };
  }

  return {
    top: getNumberVarTopPosition(layout, varTopPos[binding]),
    left: getListItemLeftPosition(layout, value),
    opacity: 1,
  };
};

const getComparisonOpacity = step => {
  const {
    compared,
    returnValue,
  } = step;

  if (returnValue !== undefined) {
    return 1;
  }

  if (!compared || compared.indexOf('guess') === -1) {
    return 0;
  }

  return 1;
};

export default (layout, stack, stepProgress) => {
  const baseFrame = computeBaseFrame(layout, stack, stepProgress);
  const entries = stack.entries.map(({ prevStep, nextStep }, i) => {
    const {
      bindings,
      compared,
      returnValue,
    } = nextStep;
    const {
      list,
      item,
      mid,
      guess,
    } = bindings;
    const baseEntry = baseFrame.entries[i];
    return {
      ...baseEntry,
      frame: {
        ...baseEntry.frame,
        intro: {
          opacity: transitionValue(
            getIntroOpacity(prevStep, layout),
            getIntroOpacity(nextStep, layout),
            stepProgress,
          )
        },
        list: {
          items: list.map((name, index) => {
            const isGuess = compared && compared.indexOf('guess') !== -1 && index === mid;

            return {
              name,
              isGuess,
              left: getListItemLeftPosition(layout, index),
              opacity: transitionValue(
                getListItemOpacity(index, prevStep),
                getListItemOpacity(index, nextStep),
                stepProgress,
              ),
              rotation: LIST_BASE_ROTATIONS[index] + (isGuess ? getWobbleRotation(stepProgress) : 0),
              glow: transitionValue(
                getListItemGlow(name, prevStep),
                getListItemGlow(name, nextStep),
                stepProgress,
              ),
            };
          }),
          isSelectable: Boolean(prevStep.intro && stepProgress === 0),
        },
        item: {
          value: getBindingValue(prevStep, nextStep, 'item'),
          opacity: transitionValue(
            getItemOpacity(prevStep),
            getItemOpacity(nextStep),
            stepProgress,
          ),
          rotation: ITEM_BASE_ROTATION + (
            compared && compared.indexOf('item') !== -1 ?
            getWobbleRotation(stepProgress) : 0
          )
        },
        low: {
          value: getBindingValue(prevStep, nextStep, 'low'),
          ...transitionValues(
            getVarProps(prevStep, layout, 'low'),
            getVarProps(nextStep, layout, 'low'),
            stepProgress,
          ),
          rotation: (
            compared && compared.indexOf('low') !== -1 ?
            getWobbleRotation(stepProgress) : 0
          ),
        },
        high: {
          value: getBindingValue(prevStep, nextStep, 'high'),
          ...transitionValues(
            getVarProps(prevStep, layout, 'high'),
            getVarProps(nextStep, layout, 'high'),
            stepProgress,
          ),
          rotation: (
            compared && compared.indexOf('high') !== -1 ?
            getWobbleRotation(stepProgress) : 0
          ),
        },
        mid: {
          value: getBindingValue(prevStep, nextStep, 'mid'),
          ...transitionValues(
            getVarProps(prevStep, layout, 'mid'),
            getVarProps(nextStep, layout, 'mid'),
            stepProgress,
          ),
        },
        comparison: {
          value: returnValue !== undefined || guess === item ? '=' : (
            guess > item ? '>' : '<'
          ),
          opacity: transitionValue(
            getComparisonOpacity(prevStep, layout),
            getComparisonOpacity(nextStep, layout),
            stepProgress,
          )
        }
      }
    };
  });

  return {
    ...baseFrame,
    entries,
  };
};
