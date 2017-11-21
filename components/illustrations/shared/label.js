import PropTypes from 'prop-types';
import React from 'react';

const Label = ({
  text,
}, {
  layout,
}) => {
  const {
    padding,
    labelWidth,
    labelHeight,
    labelFontSize,
  } = layout;

  return (
    <div
      className="label"
      style={{
        width: labelWidth,
        height: labelHeight,
        fontSize: labelFontSize,
        lineHeight: `${labelHeight}px`,
      }}
    >
      <div
        className="text"
        style={{
          padding: `0 ${padding * 2}px`,
        }}
      >
        {text}
      </div>
      <style jsx>{`
        .label {
          position: relative;
          text-align: center;
        }
        .text {
          position: absolute;
          left: 50%;
          transform: translate(-50%, 0);
          background: rgba(0, 0, 0, 0.1);
          color: black;
          text-transform: uppercase;
        }
      `}
      </style>
    </div>
  );
};

Label.propTypes = {
  text: PropTypes.string.isRequired,
};

Label.contextTypes = {
  layout: PropTypes.object,
};

export default Label;
