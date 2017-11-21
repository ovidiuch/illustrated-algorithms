import PropTypes from 'prop-types';
import React from 'react';

export default function Intro({ frame }, { layout }) {
  const {
    illustrationHeight,
  } = layout;
  const {
    opacity,
  } = frame.intro;

  return (
    <div
      className="intro"
      style={{
        opacity,
      }}
    >
      <p
        style={{
          top: illustrationHeight * 0.06,
          fontSize: layout.getRelSize(24, 2),
        }}
      >
        Find the position of a value<br/> inside a sorted list
      </p>
      <p
        style={{
          top: illustrationHeight * 0.62,
          fontSize: layout.getRelSize(18, 2),
        }}
      >
        press on one of the animals to begin
      </p>
      <style jsx>{`
        .intro {
          position: relative;
          will-change: opacity;
        }
        p {
          position: absolute;
          width: 100%;
          margin: 0;
          font-weight: 300;
          line-height: 1.2em;
          text-align: center;
          user-select: none;
          cursor: default;
          will-change: opacity;
        }
        p:last-child {
          opacity: 0.5;
        }
      `}
      </style>
    </div>
  );
}

Intro.propTypes = {
  frame: PropTypes.object.isRequired,
};

Intro.contextTypes = {
  layout: PropTypes.object,
};
