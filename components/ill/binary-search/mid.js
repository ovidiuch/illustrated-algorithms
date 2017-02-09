import React from 'react';
import {
  transitionValues,
  getBindingValue,
} from '../../../utils/transition';
import NumberVar from '../shared/number-var';
import { getListItemLeftPosition } from '../../../layout/base';
import { getNumberVarTopPosition } from '../../../layout/binary-search';

const getStyle = (step, layout) => {
  if (step.bindings.mid === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    mid,
  } = step.bindings;

  return {
    opacity: 1,
    left: getListItemLeftPosition(layout, mid),
    top: getNumberVarTopPosition(layout, 2),
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
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

Mid.contextTypes = {
  layout: React.PropTypes.object,
};
