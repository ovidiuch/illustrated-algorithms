import React from 'react';
import Value from './value';

const NumberVar = ({
  value,
  label,
  inverted,
  width,
}) => (
  <div
    className={inverted && 'inverted'}
    style={{
      width,
    }}
    >
    <Value
      value={value}
      inverted={inverted}
      width={0.8 * width}
      />
    <div
      className="label"
      style={{
        height: 0.6 * width,
        fontSize: 0.4 * width,
        lineHeight: `${0.6 * width}px`,
      }}
      >
      {label}
    </div>
    <style jsx>{`
      .label {
        font-family: monospace;
        text-align: center;
      }
    `}</style>
  </div>
);

NumberVar.propTypes = {
  value: React.PropTypes.number.isRequired,
  label: React.PropTypes.string.isRequired,
  inverted: React.PropTypes.bool,
  width: React.PropTypes.number,
};

NumberVar.defaultProps = {
  inverted: false,
  width: 30,
};

export default NumberVar;
