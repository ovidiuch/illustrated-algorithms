import React from 'react';
import {
  getBubbleSize,
} from '../utils/binary-search';
import Value from './value';

const NumberVar = ({
  value,
  label,
  inverted,
}) => (
  <div
    className={inverted && 'inverted'}
    style={{
      width: getBubbleSize(0.5),
    }}
    >
    <Value
      value={value}
      inverted={inverted}
      />
    <div
      className="label"
      style={{
        height: getBubbleSize(0.3),
        fontSize: getBubbleSize(0.2),
        lineHeight: `${getBubbleSize(0.3)}px`,
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
};

NumberVar.defaultProps = {
  inverted: false,
};

export default NumberVar;
