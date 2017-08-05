import PropTypes from 'prop-types';
import React from 'react';

export default function Comparison({ frame }, { layout }) {
  const {
    value,
    opacity,
  } = frame.comparison;
  const {
    blockLabelFontSize,
    numberVarHeight,
    comparison,
  } = layout;
  const {
    top,
    left,
  } = comparison;

  return (
    <div
      className="comparison code"
      style={{
        top,
        left,
        width: numberVarHeight,
        height: numberVarHeight,
        lineHeight: `${numberVarHeight}px`,
        fontSize: blockLabelFontSize * 1.5,
        opacity,
      }}
    >
      {value}
      <style jsx>{`
        .comparison {
          position: absolute;
          background: rgba(0, 0, 0, 0.5);
          border-radius: 50%;
          color: white;
          text-align: center;
          will-change: opacity;
        }
      `}
      </style>
    </div>
  );
}

Comparison.propTypes = {
  frame: PropTypes.object.isRequired,
};

Comparison.contextTypes = {
  layout: PropTypes.object,
};
