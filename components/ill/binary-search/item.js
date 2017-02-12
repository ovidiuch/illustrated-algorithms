import React from 'react';
import EmojiBlock from '../shared/emoji-block';

export default function Item({ frame, entryIndex }, { layout }) {
  const {
    value,
    opacity,
    rotation,
  } = frame.entries[entryIndex].item;
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
      `}</style>
    </div>
  );
}

Item.propTypes = {
  frame: React.PropTypes.object.isRequired,
  entryIndex: React.PropTypes.number.isRequired,
};

Item.contextTypes = {
  layout: React.PropTypes.object,
};
