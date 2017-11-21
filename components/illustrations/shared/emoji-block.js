import PropTypes from 'prop-types';
import React from 'react';
import PureLayoutComponent from '../../../utils/pure-layout-component';
import EmojiIcon from './emoji-icon';

const { round } = Math;

class EmojiBlock extends PureLayoutComponent {
  render() {
    const {
      name,
      glow,
    } = this.props;
    const {
      layout
    } = this.context;
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

    return (
      <div
        className={isEmpty ? 'emoji-block empty' : 'emoji-block'}
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
            will-change: background;
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
        `}
        </style>
      </div>
    );
  }
}

EmojiBlock.propTypes = {
  name: PropTypes.string,
  glow: PropTypes.number,
};

EmojiBlock.defaultProps = {
  name: '',
  glow: 0,
};

EmojiBlock.contextTypes = {
  layout: PropTypes.object,
};

export default EmojiBlock;
