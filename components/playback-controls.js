import PropTypes from 'prop-types';
/* global window */

import React from 'react';
import PureLayoutComponent from '../utils/pure-layout-component';

const { round, min, max } = Math;

const SvgButton = ({
  svgPath,
  onClick,
}, {
  layout
}) => {
  const {
    footerHeight,
    footerButtonIconSize,
  } = layout;
  return (
    <div
      className="button"
      style={{
        width: footerHeight,
        height: footerHeight,
        lineHeight: `${footerHeight}px`,
      }}
      onClick={onClick}
    >
      <svg
        width={footerButtonIconSize}
        height={footerButtonIconSize}
        viewBox="0 0 24 24"
      >
        <path d={svgPath}/>
      </svg>
      <style jsx>{`
        .button {
          position: relative;
          cursor: pointer;
          background: rgba(255, 255, 255, 0.8);
          text-align: center;
        }
        svg {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          fill: rgba(0, 0, 0, 0.8);
        }
      `}
      </style>
    </div>
  );
};

SvgButton.propTypes = {
  svgPath: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

SvgButton.contextTypes = {
  layout: PropTypes.object,
};

class PlaybackControls extends PureLayoutComponent {
  constructor(props) {
    super(props);

    this.handleSliderPress = this.handleSliderPress.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handleRelease = this.handleRelease.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
  }

  componentWillUnmount() {
    this.removeWindowHandlers();
  }

  handleSliderPress(e) {
    this.setPositionFromPointerEvent(e);
    this.props.onPause();
    this.addWindowHandlers();
  }

  handlePointerMove(e) {
    // Disable text selection
    e.preventDefault();
    this.setPositionFromPointerEvent(e);
  }

  handleRelease() {
    this.removeWindowHandlers();
  }

  handleReplay() {
    this.props.onScrollTo(0);
  }

  addWindowHandlers() {
    window.addEventListener('mousemove', this.handlePointerMove);
    window.addEventListener('touchmove', this.handlePointerMove);
    window.addEventListener('mouseup', this.handleRelease);
    window.addEventListener('touchend', this.handleRelease);
  }

  removeWindowHandlers() {
    window.removeEventListener('mousemove', this.handlePointerMove);
    window.removeEventListener('touchmove', this.handlePointerMove);
    window.removeEventListener('mouseup', this.handleRelease);
    window.removeEventListener('touchend', this.handleRelease);
  }

  setPositionFromPointerEvent(e) {
    const { maxPos } = this.props;
    const { left } = this.sliderNode.getBoundingClientRect();
    const pointerX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    const x = pointerX - left;
    const pos = round(max(0, min(1, x / this.sliderNode.offsetWidth)) * maxPos);
    this.props.onScrollTo(pos);
  }

  render() {
    const {
      onPlay,
      onPause,
      isPlaying,
      pos,
      maxPos,
    } = this.props;
    const {
      layout
    } = this.context;
    const {
      footerHeight,
      footerHintFontSize,
    } = layout;

    return (
      <div className="player-controls">
        {pos >= maxPos ? (
          <SvgButton
            svgPath="M12 5V1L7 6l5 5V7c3.31 0 6 2.69 6 6s-2.69 6-6 6-6-2.69-6-6H4c0 4.42 3.58 8 8 8s8-3.58 8-8-3.58-8-8-8z"
            onClick={this.handleReplay}
          />
        ) : isPlaying ? (
          <SvgButton
            svgPath="M6 19h4V5H6v14zm8-14v14h4V5h-4z"
            onClick={onPause}
          />
        ) : (
          <SvgButton
            svgPath="M8 5v14l11-7z"
            onClick={onPlay}
          />
        )}
        <div
          ref={node => {
            this.sliderNode = node;
          }}
          className="slider"
          style={{ left: footerHeight }}
          onMouseDown={this.handleSliderPress}
          onTouchStart={this.handleSliderPress}
        >
          <div
            className="progress"
            style={{ width: `${(pos / maxPos) * 100}%` }}
          />
          <div
            className="slider-hint"
            style={{
              fontSize: footerHintFontSize,
              lineHeight: `${footerHeight}px`,
            }}
          >
            drag to rewind
          </div>
        </div>
        <style jsx>{`
          .player-controls {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .slider {
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
          }
          .progress {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            background: rgba(255, 255, 255, 0.4);
          }
          .slider-hint {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            font-weight: 300;
            text-align: center;
            opacity: 0.2;
            user-select: none;
            cursor: default;
          }
        `}
        </style>
      </div>
    );
  }
}

PlaybackControls.propTypes = {
  pos: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  onPlay: PropTypes.func.isRequired,
  onPause: PropTypes.func.isRequired,
  onScrollTo: PropTypes.func.isRequired,
};

PlaybackControls.contextTypes = {
  layout: PropTypes.object,
};

export default PlaybackControls;
