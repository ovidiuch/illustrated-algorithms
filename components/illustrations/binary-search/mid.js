import PropTypes from 'prop-types';
import React from 'react';
import NumberVar from '../shared/number-var';

export default function Mid({ frame }) {
  const {
    value,
    top,
    left,
    opacity,
  } = frame.mid;

  if (value === undefined) {
    return null;
  }

  return (
    <div
      className="mid"
      style={{
        opacity,
        transform: `translate(${left}px, ${top}px)`
      }}
    >
      <NumberVar
        value={value}
        label="mid"
      />
      <style jsx>{`
        .mid {
          position: absolute;
          will-change: opacity, transform;
        }
      `}
      </style>
    </div>
  );
}

Mid.propTypes = {
  frame: PropTypes.object.isRequired,
};

Mid.contextTypes = {
  layout: PropTypes.object,
};
