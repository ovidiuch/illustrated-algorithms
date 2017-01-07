import React from 'react';
import {
  ofSameValue,
  onlyDefined,
} from '../../../utils/values';
import {
  transitionValues,
  getBindingValue,
} from '../../../utils/transition';
import {
  getBubbleSize
} from '../../../utils/binary-search';
import NumberVar from '../../number-var';

const getStyle = (step, { sideWidth }) => {
  if (!step || step.bindings.low === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    low,
    mid,
    high,
  } = step.bindings;

  const offsetAlongSiblings = {
    0: getBubbleSize(sideWidth, 0.25),
    1: 0,
    2: -getBubbleSize(sideWidth, 0.25),
  };
  const occupyingSamePos = ofSameValue(low, onlyDefined([mid, high]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return {
    opacity: 1,
    left: getBubbleSize(sideWidth, low) + offset,
  };
};

export default function Low({ prevStep, nextStep, stepProgress }, { layout }) {
  const {
    sideWidth,
  } = layout;

  const low = getBindingValue(prevStep, nextStep, 'low');
  if (low === undefined) {
    return null;
  }

  const currStyle = transitionValues(
    getStyle(prevStep, layout),
    getStyle(nextStep, layout),
    stepProgress,
  );

  return (
    <div style={{ position: 'absolute', ...currStyle }}>
      <NumberVar
        value={low}
        label="low"
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

Low.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

Low.contextTypes = {
  layout: React.PropTypes.object,
};
