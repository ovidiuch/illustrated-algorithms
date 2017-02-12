import React from 'react';
import NumberVar from '../shared/number-var';

export default function Mid({ frame, entryIndex }) {
  const {
    value,
    top,
    left,
    opacity,
  } = frame.entries[entryIndex].mid;

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
      `}</style>
    </div>
  );
}

Mid.propTypes = {
  frame: React.PropTypes.object.isRequired,
  entryIndex: React.PropTypes.number.isRequired,
};

Mid.contextTypes = {
  layout: React.PropTypes.object,
};
