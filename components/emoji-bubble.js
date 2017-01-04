import React from 'react';
import Bear from 'emojione/assets/svg/1f43b.svg';
import Cat from 'emojione/assets/svg/1f431.svg';
import Dog from 'emojione/assets/svg/1f436.svg';
import Pig from 'emojione/assets/svg/1f437.svg';
import Rat from 'emojione/assets/svg/1f400.svg';
import Lion from 'emojione/assets/svg/1f981.svg';
import Snail from 'emojione/assets/svg/1f40c.svg';
import {
  getBubbleSize,
} from '../utils/binary-search';

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
}) => (
  <div
    className="emojiBubble"
    style={{
      width: getBubbleSize(),
      height: getBubbleSize(1.25),
    }}
    >
    <div
      className="bubble"
      style={{
        width: getBubbleSize(0.9),
        height: getBubbleSize(0.9),
        top: getBubbleSize(0.2),
        left: getBubbleSize(0.05),
      }}
      />
    <div
      className="icon"
      style={{
        width: getBubbleSize(0.6),
        height: getBubbleSize(0.6),
        top: getBubbleSize(0.2),
        left: getBubbleSize(0.2),
      }}
      >
      {emojis[name] ? React.createElement(emojis[name]) : null}
    </div>
    <div
      className="label"
      style={{
        top: getBubbleSize(),
        fontSize: getBubbleSize(0.25),
        lineHeight: `${getBubbleSize(0.25)}px`
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
};

export default EmojiBubble;
