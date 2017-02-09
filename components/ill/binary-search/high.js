import React from 'react';
import {
  transitionValues,
  getBindingValue,
} from '../../../utils/transition';
import getWobbleRotation from '../../../utils/wobble';
import NumberVar from '../shared/number-var';
import { getListItemLeftPosition } from '../../../layout/base';
import { getNumberVarTopPosition } from '../../../layout/binary-search';

const getStyle = (step, layout) => {
  if (step.bindings.high === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    high,
  } = step.bindings;

  return {
    opacity: 1,
    top: getNumberVarTopPosition(layout, 1),
    left: getListItemLeftPosition(layout, high),
  };
};

export default function High({ prevStep, nextStep, stepProgress }, { layout }) {
  const high = getBindingValue(prevStep, nextStep, 'high');
  if (high === undefined) {
    return null;
  }

  const currStyle = transitionValues(
    getStyle(prevStep, layout),
    getStyle(nextStep, layout),
    stepProgress,
  );

  const { compared } = nextStep;
  const rotation =
    compared && compared.indexOf('low') !== -1 ? getWobbleRotation(stepProgress) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        ...currStyle,
        transform: `rotate(${rotation}deg)`
      }}
      >
      <NumberVar
        value={high}
        label="high"
        />
    </div>
  );
}

High.propTypes = {
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

High.contextTypes = {
  layout: React.PropTypes.object,
};
