import React from 'react';
import Bear from 'emojione/assets/svg/1f43b.svg';
import Cat from 'emojione/assets/svg/1f431.svg';
import Dog from 'emojione/assets/svg/1f436.svg';
import Pig from 'emojione/assets/svg/1f437.svg';
import Rat from 'emojione/assets/svg/1f400.svg';
import Lion from 'emojione/assets/svg/1f981.svg';
import Snail from 'emojione/assets/svg/1f40c.svg';

const emojis = {
  bear: Bear,
  cat: Cat,
  dog: Dog,
  pig: Pig,
  rat: Rat,
  lion: Lion,
  snail: Snail,
};

const EmojiBubble = ({
  name,
  width,
}) => (
  <div
    className="emojiBubble"
    style={{
      width,
      height: 1.25 * width,
    }}
    >
    <div
      className="bubble"
      style={{
        width: 0.9 * width,
        height: 0.9 * width,
        top: 0.2 * width,
        left: 0.05 * width,
      }}
      />
    <div
      className="icon"
      style={{
        width: 0.6 * width,
        height: 0.6 * width,
        top: 0.2 * width,
        left: 0.2 * width,
      }}
      >
      {emojis[name] ? React.createElement(emojis[name]) : null}
    </div>
    <div
      className="label"
      style={{
        top: width,
        fontSize: 0.25 * width,
        lineHeight: `${0.25 * width}px`
      }}
      >
      {name}
    </div>
    <style jsx>{`
      .emojiBubble {
        position: relative;
      }
      .bubble {
        position: absolute;
        background: rgba(255, 255, 255, 0.5);
        border-radius: 100%;
        transform: rotateX(55deg);
      }
      .icon {
        position: absolute;
      }
      .label {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
      }
    `}</style>
  </div>
);

EmojiBubble.propTypes = {
  name: React.PropTypes.string.isRequired,
  width: React.PropTypes.number,
};

EmojiBubble.defaultProps = {
  width: 60,
};

export default EmojiBubble;
