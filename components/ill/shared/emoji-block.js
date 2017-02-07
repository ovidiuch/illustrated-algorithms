import React from 'react';
import EmojiIcon from './emoji-icon';

const { round } = Math;

const EmojiBlock = ({
  name,
  glow,
}, {
  layout
}) => {
  const {
    color,
    borderWidth,
    blockWidth,
    blockHeight,
    blockLabelFontSize,
    blockLabelHeight,
  } = layout;
  const iconSize = round(blockWidth * 0.8);
  const isEmpty = !name;
  const classes = ['emoji-block'].concat(isEmpty && 'empty');

  return (
    <div
      className={classes.join(' ')}
      style={{
        width: blockWidth,
        height: blockHeight,
        borderWidth,
        background: color,
      }}
      >
      <div
        className="glow"
        style={{
          background: `rgba(255, 255, 255, ${glow})`,
        }}
        />
      <div
        className="icon"
        style={{
          width: iconSize,
          height: iconSize,
          top: blockWidth * 0.125,
          left: blockWidth * 0.1,
        }}
        >
        <EmojiIcon
          name={name || 'no entry'}
          width={iconSize}
          height={iconSize}
          />
      </div>
      <div
        className="label"
        style={{
          top: blockWidth - (borderWidth * 2),
          fontSize: blockLabelFontSize,
          lineHeight: `${blockLabelHeight}px`,
        }}
        >
        {name ? name : 'empty'}
      </div>
      <style jsx>{`
        .emoji-block {
          position: relative;
          border-style: solid;
          border-color: rgba(0, 0, 0, 0.5);
          box-sizing: border-box;
        }
        .glow {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
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
        .empty {
          border-style: dashed;
        }
        .empty .icon {
          transform: rotate(90deg);
        }
        .empty .icon :global(path) {
          fill: rgba(0, 0, 0, 0.3);
        }
        .empty .label {
          color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

EmojiBlock.propTypes = {
  name: React.PropTypes.string,
  glow: React.PropTypes.number,
};

EmojiBlock.defaultProps = {
  name: '',
  glow: 0,
};

EmojiBlock.contextTypes = {
  layout: React.PropTypes.object,
};

export default EmojiBlock;
