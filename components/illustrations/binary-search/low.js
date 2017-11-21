import PropTypes from 'prop-types';
import React from 'react';
import NumberVar from '../shared/number-var';

export default function Low({ frame }) {
  const {
    value,
    top,
    left,
    opacity,
    rotation,
  } = frame.low;

  if (value === undefined) {
    return null;
  }

  return (
    <div
      className="low"
      style={{
        opacity,
        transform: `
          translate(${left}px, ${top}px)
          rotate(${rotation}deg)
        `
      }}
    >
      <NumberVar
        value={value}
        label="low"
      />
      <style jsx>{`
        .low {
          position: absolute;
          will-change: opacity, transform;
        }
      `}
      </style>
    </div>
  );
}

Low.propTypes = {
  frame: PropTypes.object.isRequired,
};

Low.contextTypes = {
  layout: PropTypes.object,
};
