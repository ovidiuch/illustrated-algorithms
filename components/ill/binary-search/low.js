import React from 'react';
import NumberVar from '../shared/number-var';

export default function Low({ frame, entryIndex }) {
  const {
    value,
    top,
    left,
    opacity,
    rotation,
  } = frame.entries[entryIndex].low;

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
      `}</style>
    </div>
  );
}

Low.propTypes = {
  frame: React.PropTypes.object.isRequired,
  entryIndex: React.PropTypes.number.isRequired,
};

Low.contextTypes = {
  layout: React.PropTypes.object,
};
