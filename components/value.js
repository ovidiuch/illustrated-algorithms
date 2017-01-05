import React from 'react';

const Value = ({
  value,
  inverted,
  width,
}) => (
  <div
    className={`value ${inverted && 'inverted'}`}
    style={{
      width,
      height: width,
      borderRadius: 0.25 * width,
      fontSize: 0.6 * width,
      lineHeight: `${width}px`,
    }}
    >
    {value}
    <style jsx>{`
      .value {
        margin: 0 auto;
        background: rgba(0, 0, 0, 0.5);
        color: white;
        font-family: monospace;
        text-align: center;
      }
      .inverted {
        background: rgba(0, 0, 0, 0.1);
        color: black;
      }
    `}</style>
  </div>
);

Value.propTypes = {
  value: React.PropTypes.oneOfType([
    React.PropTypes.number,
    React.PropTypes.string,
  ]).isRequired,
  inverted: React.PropTypes.bool,
  width: React.PropTypes.number,
};

Value.defaultProps = {
  inverted: false,
  width: 24,
};

export default Value;
