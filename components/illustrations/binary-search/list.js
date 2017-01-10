import React from 'react';
import EmojiBlock from '../shared/emoji-block';
import {
  transitionValue,
} from '../../../utils/transition';
import getWobbleRotation from '../../../utils/wobble';

const getItemGlow = (name, step) =>
  step !== undefined && step.bindings.guess === name ? 0.5 : 0;

const getItemOpacity = (index, step) => {
  if (step === undefined) {
    return 1;
  }

  const {
    low,
    high,
  } = step.bindings;

  const isIncluded = (
    (low === undefined || high === undefined) ||
    (index >= low && index <= high)
  );

  return isIncluded ? 1 : 0.2;
};

export default function List({ prevStep, nextStep, stepProgress }, { layout }) {
  const { bindings, compared } = nextStep;
  const {
    list,
    mid,
  } = bindings;

  return (
    <div
      className="list"
      style={{
        top: layout.getListTopPosition(),
      }}
      >
      {list.map((name, index) => {
        const isGuess = compared && compared.indexOf('guess') !== -1 && index === mid;
        const rotation = isGuess ? getWobbleRotation(stepProgress) : 0;
        return (
          <div
            key={name}
            className="item"
            style={{
              left: layout.getListItemLeftPosition(index),
              opacity: transitionValue(
                getItemOpacity(index, prevStep),
                getItemOpacity(index, nextStep),
                stepProgress,
              ),
              transform: `rotate(${rotation}deg)`,
              zIndex: isGuess ? 1 : 0,
            }}
            >
            <EmojiBlock
              name={name}
              glow={transitionValue(
                getItemGlow(name, prevStep),
                getItemGlow(name, nextStep),
                stepProgress,
              )}
              />
          </div>
        );
      })}
      <style jsx>{`
        .list {
          position: absolute;
        }
        .item {
          position: absolute;
        }
      `}</style>
    </div>
  );
}

List.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

List.contextTypes = {
  layout: React.PropTypes.object,
};
