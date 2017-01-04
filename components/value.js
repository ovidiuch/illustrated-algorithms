import React from 'react';
import {
  getBubbleSize,
} from '../utils/binary-search';

const Value = ({
  value,
  inverted,
}) => (
  <div
    className={`value ${inverted && 'inverted'}`}
    style={{
      width: getBubbleSize(0.4),
      height: getBubbleSize(0.4),
      borderRadius: getBubbleSize(0.1),
      fontSize: getBubbleSize(0.25),
      lineHeight: `${getBubbleSize(0.4)}px`,
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
};

Value.defaultProps = {
  inverted: false,
};

export default Value;
