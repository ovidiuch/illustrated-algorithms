import React from 'react';
import NumberVar from '../shared/number-var';

export default function High({ frame, entryIndex }) {
  const {
    value,
    top,
    left,
    opacity,
    rotation,
  } = frame.entries[entryIndex].high;

  if (value === undefined) {
    return null;
  }

  return (
    <div
      className="high"
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
        label="high"
        />
      <style jsx>{`
        .high {
          position: absolute;
          will-change: opacity, transform;
        }
      `}</style>
    </div>
  );
}

High.propTypes = {
  frame: React.PropTypes.object.isRequired,
  entryIndex: React.PropTypes.number.isRequired,
};

High.contextTypes = {
  layout: React.PropTypes.object,
};
