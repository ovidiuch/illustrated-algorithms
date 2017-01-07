import React from 'react';
import EmojiBubble from '../../emoji-bubble';
import { transitionValues } from '../../../utils/transition';
import {
  getBubbleSize
} from '../../../utils/binary-search';

const getItemStyle = (index, step) => {
  if (step === undefined) {
    return {
      opacity: 0,
    };
  }

  const {
    low,
    high,
  } = step.bindings;

  const isIncluded = (
    (low === undefined || high === undefined) ||
    (index >= low && index <= high)
  );

  return {
    opacity: isIncluded ? 1 : 0.4,
  };
};

export default function List({ prevStep, nextStep, stepProgress }, { layout }) {
  const { bindings } = nextStep;
  const {
    list,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  return (
    <div
      className="list"
      style={{
        top: getBubbleSize(sideWidth, 0.7),
      }}
      >
      {list.map((name, index) => {
        return (
          <div
            key={name}
            className="item"
            style={{
              left: getBubbleSize(sideWidth, index),
              ...transitionValues(
                getItemStyle(index, prevStep, layout),
                getItemStyle(index, nextStep, layout),
                stepProgress,
              ),
            }}
            >
            <EmojiBubble name={name} width={getBubbleSize(sideWidth)}/>
          </div>
        );
      })}
      <style jsx>{`
        .list {
          position: absolute;
          left: 0;
        }
        .item {
          position: absolute;
          top: 0;
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
