import React from 'react';
import Value from '../../value';
import {
  getBubbleSize
} from '../../../utils/binary-search';

export default function Comparison({ nextStep }, { layout }) {
  const { bindings, compared, returnValue } = nextStep;
  const {
    item,
    mid,
    guess,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  if (!guess || (!compared && returnValue === undefined)) {
    return null;
  }

  const val = returnValue === undefined ? (
    guess === item ? '=' : (
      guess > item ? '>' : '<'
    )
  ) : '=';

  return (
    <div
      style={{
        position: 'absolute',
        top: getBubbleSize(sideWidth, 0.7 + 1.25 + 0.2),
        left: getBubbleSize(sideWidth, mid + 0.3),
      }}
      >
      <Value
        value={val}
        width={getBubbleSize(sideWidth, 0.4)}
        />
    </div>
  );
}

Comparison.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
};

Comparison.contextTypes = {
  layout: React.PropTypes.object,
};
