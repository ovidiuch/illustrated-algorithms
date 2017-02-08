import React from 'react';
import {
  transitionValue
} from '../../../utils/transition';

const getOpacity = step => {
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

export default function Comparison({ prevStep, nextStep, stepProgress }, { layout }) {
  const { bindings, returnValue } = nextStep;
  const {
    item,
    guess,
  } = bindings;
  const {
    blockLabelFontSize,
    numberVarHeight,
    comparison,
  } = layout;
  const {
    top,
    left,
  } = comparison;

  const val = returnValue !== undefined || guess === item ? '=' : (
    guess > item ? '>' : '<'
  );

  return (
    <div
      className="comparison code"
      style={{
        top,
        left,
        width: numberVarHeight,
        height: numberVarHeight,
        lineHeight: `${numberVarHeight}px`,
        fontSize: blockLabelFontSize * 1.5,
        opacity: transitionValue(
          getOpacity(prevStep, layout),
          getOpacity(nextStep, layout),
          stepProgress,
        ),
      }}
      >
      {val}
      <style jsx>{`
        .comparison {
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          color: white;
          text-align: center;
        }
      `}</style>
    </div>
  );
}

Comparison.propTypes = {
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

Comparison.contextTypes = {
  layout: React.PropTypes.object,
};
