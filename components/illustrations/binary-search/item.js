import React from 'react';
import EmojiBlock from '../shared/emoji-block';
import getWobbleRotation from '../../../utils/wobble';

export default function Item({ nextStep, stepProgress }, { layout }) {
  const { bindings } = nextStep;
  const {
    item,
  } = bindings;

  const top = layout.getItemTopPosition();
  const left = layout.getItemLeftPosition();
  const { compared } = nextStep;
  const rotation =
    compared && compared.indexOf('item') !== -1 ? getWobbleRotation(stepProgress) : 0;

  return (
    <div
      style={{
        position: 'absolute',
        top,
        left,
        transform: `rotate(${rotation}deg)`,
      }}
      >
      <EmojiBlock name={item} glow={0.4}/>
    </div>
  );
}

Item.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  stepProgress: React.PropTypes.number.isRequired,
};

Item.contextTypes = {
  layout: React.PropTypes.object,
};
