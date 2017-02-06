import React from 'react';
import {
  transitionValues,
  getBindingValue,
} from '../../../utils/transition';
import getWobbleRotation from '../../../utils/wobble';
import NumberVar from '../shared/number-var';

const getStyle = (step, layout) => {
  if (step.bindings.low === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    low,
  } = step.bindings;

  return {
    opacity: 1,
    top: layout.getNumberVarTopPosition(0),
    left: layout.getListItemLeftPosition(low),
  };
};

export default function Low({ prevStep, nextStep, stepProgress }, { layout }) {
  const low = getBindingValue(prevStep, nextStep, 'low');
  if (low === undefined) {
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
        value={low}
        label="low"
        />
    </div>
  );
}

Low.propTypes = {
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

Low.contextTypes = {
  layout: React.PropTypes.object,
};
