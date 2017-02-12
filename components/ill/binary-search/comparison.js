import React from 'react';

export default function Comparison({ frame, entryIndex }, { layout }) {
  const {
    value,
    opacity,
  } = frame.entries[entryIndex].comparison;
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
      `}</style>
    </div>
  );
}

Comparison.propTypes = {
  frame: React.PropTypes.object.isRequired,
  entryIndex: React.PropTypes.number.isRequired,
};

Comparison.contextTypes = {
  layout: React.PropTypes.object,
};
