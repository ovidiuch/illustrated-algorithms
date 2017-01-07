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
  if (!step || step.bindings.high === undefined) {
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
    1: getBubbleSize(sideWidth, 0.5),
    2: getBubbleSize(sideWidth, 0.75),
  };
  const occupyingSamePos = ofSameValue(high, onlyDefined([low, mid]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return {
    opacity: 1,
    left: getBubbleSize(sideWidth, high) + offset,
  };
};

export default function High({ prevStep, nextStep, stepProgress }, { layout }) {
  const {
    sideWidth,
  } = layout;

  const high = getBindingValue(prevStep, nextStep, 'high');
  if (high === undefined) {
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
        value={high}
        label="high"
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

High.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

High.contextTypes = {
  layout: React.PropTypes.object,
};
