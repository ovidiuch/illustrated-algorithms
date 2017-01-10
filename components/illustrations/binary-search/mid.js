import React from 'react';
import {
  transitionValues,
  getBindingValue,
} from '../../../utils/transition';
import NumberVar from '../shared/number-var';

const getStyle = (step, layout) => {
  if (!step || step.bindings.mid === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    mid,
  } = step.bindings;

  return {
    opacity: 1,
    left: layout.getListItemLeftPosition(mid),
    top: layout.getNumberVarTopPosition(2),
  };
};

export default function Mid({ prevStep, nextStep, stepProgress }, { layout }) {
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
