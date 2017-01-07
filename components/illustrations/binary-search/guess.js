import React from 'react';
import EmojiBubble from '../../emoji-bubble';
import {
  getBubbleSize
} from '../../../utils/binary-search';

export default function Guess({ nextStep }, { layout }) {
  const { bindings } = nextStep;
  const {
    list,
    item,
    mid,
    guess,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  const left =
    guess ?
    getBubbleSize(sideWidth, mid) :
    getBubbleSize(sideWidth, (list.length / 2) - 0.5);

  return (
    <div
      style={{
        position: 'absolute',
        top: getBubbleSize(sideWidth, 0.7 + 1.25 + 0.6),
        left,
      }}
      >
      <EmojiBubble name={item} width={getBubbleSize(sideWidth)}/>
    </div>
  );
}

Guess.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
};

Guess.contextTypes = {
  layout: React.PropTypes.object,
};
