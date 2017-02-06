import React from 'react';
import {
  transitionValue,
  getBindingValue,
} from '../../../utils/transition';
import EmojiBlock from '../shared/emoji-block';
import getWobbleRotation from '../../../utils/wobble';

const getOpacity = step => !step.intro && step.bindings.item !== undefined ? 1 : 0;

const BASE_ROTATION = -1.5;

export default function Item({ prevStep, nextStep, stepProgress }, { layout }) {
  const item = getBindingValue(prevStep, nextStep, 'item');
  if (item === undefined) {
    return null;
  }

  const opacity = transitionValue(
    getOpacity(prevStep),
    getOpacity(nextStep),
    stepProgress,
  );

  const {
    itemTopPosition,
    itemLeftPosition,
  } = layout;

  const { compared } = nextStep;
  const rotation = BASE_ROTATION + (
    compared && compared.indexOf('item') !== -1 ? getWobbleRotation(stepProgress) : 0
  );

  return (
    <div
      style={{
        position: 'absolute',
        opacity,
        top: itemTopPosition,
        left: itemLeftPosition,
        transform: `rotate(${rotation}deg)`,
      }}
      >
      <EmojiBlock name={item} glow={0.4}/>
    </div>
  );
}

Item.propTypes = {
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

Item.contextTypes = {
  layout: React.PropTypes.object,
};
