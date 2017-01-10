import React from 'react';
import EmojiIcon from './emoji-icon';

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
        <EmojiIcon name={name}/>
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
