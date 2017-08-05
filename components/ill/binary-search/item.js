import PropTypes from 'prop-types';
import React from 'react';
import EmojiBlock from '../shared/emoji-block';

export default function Item({ frame }, { layout }) {
  const {
    value,
    opacity,
    rotation,
  } = frame.item;
  const {
    top,
    left,
  } = layout.item;

  if (!value) {
    return null;
  }

  return (
    <div
      className="item"
      style={{
        opacity,
        transform: `
          translate(${left}px, ${top}px)
          rotate(${rotation}deg)
        `
      }}
    >
      <EmojiBlock name={value} glow={0.4}/>
      <style jsx>{`
        .item {
          position: absolute;
          will-change: opacity, transform;
        }
      `}
      </style>
    </div>
  );
}

Item.propTypes = {
  frame: PropTypes.object.isRequired,
};

Item.contextTypes = {
  layout: PropTypes.object,
};
