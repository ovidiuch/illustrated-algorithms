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
  if (!step || step.bindings.mid === undefined) {
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
    0: () => getBubbleSize(sideWidth, 0.25),
    1: () => low === undefined ? getBubbleSize(sideWidth, 0.5) : 0,
    2: () => getBubbleSize(sideWidth, 0.25),
  };
  const occupyingSamePos = ofSameValue(mid, onlyDefined([low, high]));
  const offset = offsetAlongSiblings[occupyingSamePos]();

  return {
    opacity: 1,
    left: getBubbleSize(sideWidth, mid) + offset,
  };
};

export default function Mid({ prevStep, nextStep, stepProgress }, { layout }) {
  const {
    sideWidth,
  } = layout;

  const mid = getBindingValue(prevStep, nextStep, 'mid');
  if (mid === undefined) {
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
        value={mid}
        label="mid"
        inverted
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

Mid.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

Mid.contextTypes = {
  layout: React.PropTypes.object,
};
