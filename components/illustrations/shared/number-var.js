import React from 'react';

const { round } = Math;

const PX_RATIOS = {
  VALUE_PER_ITEM_WIDTH: 16 / 48,
};

const NumberVar = ({
  value,
  label,
}, {
  layout,
}) => {
  const {
    blockLabelFontSize,
    numberVarWidth,
    numberVarHeight,
  } = layout;
  const valueWidth = round(numberVarWidth * PX_RATIOS.VALUE_PER_ITEM_WIDTH);
  const labelWidth = numberVarWidth - valueWidth;

  return (
    <div
      className="number-var"
      style={{
        width: numberVarWidth,
        height: numberVarHeight,
      }}
      >
      <div
        className="label"
        style={{
          width: labelWidth,
          height: numberVarHeight,
          fontSize: blockLabelFontSize,
          lineHeight: `${numberVarHeight}px`,
        }}
        >
        {label}
      </div>
      <div
        className="value"
        style={{
          width: valueWidth,
          height: numberVarHeight,
          fontSize: blockLabelFontSize,
          lineHeight: `${numberVarHeight}px`,
        }}
        >
        {value}
      </div>
      <style jsx>{`
        .number-var {
          text-transform: uppercase;
          text-align: center;
        }
        .label {
          float: left;
          background: rgba(0, 0, 0, 0.1);
          color: black;
        }
        .value {
          float: left;
          background: rgba(0, 0, 0, 0.5);
          color: white;
        }
      `}</style>
    </div>
  );
};

NumberVar.propTypes = {
  value: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
};

NumberVar.contextTypes = {
  layout: React.PropTypes.object,
};

export default NumberVar;
