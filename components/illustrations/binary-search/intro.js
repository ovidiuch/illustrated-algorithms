import React from 'react';
import {
  transitionValue
} from '../../../utils/transition';

const getOpacity = step => step ? 0 : 1;

export default function Intro({ prevStep, nextStep, stepProgress }, { layout }) {
  const {
    illustrationHeight,
  } = layout;

  return (
    <div
      className="intro"
      style={{
        opacity: transitionValue(
          getOpacity(prevStep, layout),
          getOpacity(nextStep, layout),
          stepProgress,
        ),
      }}
      >
      <p
        style={{
          top: illustrationHeight * 0.06,
          fontSize: layout.getRelSize(24, 2),
        }}
        >
        Find the position of a value inside a sorted list
      </p>
      <p
        style={{
          top: illustrationHeight * 0.62,
          fontSize: layout.getRelSize(18, 2),
        }}
        >
        press on one of the animals to begin
      </p>
      <style jsx>{`
        p {
          position: absolute;
          width: 100%;
          margin: 0;
          font-weight: 300;
          line-height: 1.2em;
          text-align: center;
          user-select: none;
          cursor: default;
        }
        p:last-child {
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
}

Intro.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

Intro.contextTypes = {
  layout: React.PropTypes.object,
};
