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

const EmojiBlock = ({
  name,
  glow,
}, {
  layout
}) => {
  const {
    borderWidth,
    blockWidth,
    blockHeight,
    blockLabelFontSize,
    blockLabelHeight,
  } = layout;
  return (
    <div
      className="EmojiBlock"
      style={{
        width: blockWidth,
        height: blockHeight,
        borderWidth,
        background: `rgba(255, 255, 255, ${glow})`,
      }}
      >
      <div
        className="icon"
        style={{
          width: blockWidth * 0.8,
          height: blockWidth * 0.8,
          top: blockWidth * 0.125,
          left: blockWidth * 0.1,
        }}
        >
        {emojis[name] ? React.createElement(emojis[name]) : null}
      </div>
      <div
        className="label"
        style={{
          top: blockWidth - (borderWidth * 2),
          fontSize: blockLabelFontSize,
          lineHeight: `${blockLabelHeight}px`,
        }}
        >
        {name}
      </div>
      <style jsx>{`
        .EmojiBlock {
          position: relative;
          border-style: solid;
          border-color: #763D38;
          box-sizing: border-box;
        }
        .icon {
          position: absolute;
        }
        .label {
          position: absolute;
          left: 0;
          right: 0;
          color: rgba(0, 0, 0, 0.8);
          text-align: center;
          text-transform: uppercase;
        }
      `}</style>
    </div>
  );
};

EmojiBlock.propTypes = {
  name: React.PropTypes.string.isRequired,
  glow: React.PropTypes.number.isRequired,
};

EmojiBlock.contextTypes = {
  layout: React.PropTypes.object,
};

export default EmojiBlock;
