import React from 'react';
import PureLayoutComponent from '../../../utils/pure-layout-component';

class Intro extends PureLayoutComponent {
  render() {
    const {
      frame,
      entryIndex,
    } = this.props;
    const {
      padding,
      borderWidth,
      innerWidth,
    } = this.context.layout;
    const {
      opacity,
      titleFontSize,
      titleLineHeight,
      btnTop,
      btnFontSize,
      btnSvgSize,
    } = frame.entries[entryIndex].intro;

    return (
      <div
        className="intro"
        style={{
          opacity,
        }}
        >
        <h1
          className="title"
          style={{
            fontSize: titleFontSize,
            lineHeight: `${titleLineHeight}px`,
          }}
          >Place the elements of a list<br/> in alphabetical order</h1>
        <div
          className="shuffle-btn"
          style={{
            top: btnTop,
            left: innerWidth * 0.25,
            fontSize: btnFontSize,
          }}
          onClick={this.props.onShuffle}
          >
          <svg
            style={{
              marginTop: padding / 2,
            }}
            width={btnSvgSize}
            height={btnSvgSize}
            viewBox="0 0 24 24"
            >
            <path d="M10.59 9.17L5.41 4 4 5.41l5.17 5.17 1.42-1.41zM14.5 4l2.04 2.04L4 18.59 5.41 20 17.96 7.46 20 9.5V4h-5.5zm.33 9.41l-1.41 1.41 3.13 3.13L14.5 20H20v-5.5l-2.04 2.04-3.13-3.13z"/>
          </svg>
          <span
            className="label"
            style={{
              borderWidth,
              marginLeft: btnSvgSize,
            }}
            >shuffle
          </span>
        </div>
        <div
          className="start-btn"
          style={{
            top: btnTop,
            left: innerWidth * 0.55,
            fontSize: btnFontSize,
          }}
          onClick={this.props.onStart}
          >
          <svg
            style={{
              marginTop: padding / 2,
            }}
            width={btnSvgSize}
            height={btnSvgSize}
            viewBox="0 0 24 24"
            >
            <path d="M8 5v14l11-7z"/>
          </svg>
          <span
            className="label"
            style={{
              borderWidth,
              marginLeft: btnSvgSize,
            }}
            >start
          </span>
        </div>
        <style jsx>{`
          .intro {
            will-change: opacity;
          }
          .title {
            position: absolute;
            width: 100%;
            margin: 0;
            font-weight: 300;
            text-align: center;
            user-select: none;
            cursor: default;
          }
          .shuffle-btn,
          .start-btn {
            position: absolute;
            font-weight: 300;
            line-height: 1.2em;
            text-align: center;
            user-select: none;
            opacity: 0.5;
            cursor: pointer;
          }
          .shuffle-btn svg,
          .start-btn svg {
            position: absolute;
          }
          .label {
            border-bottom: 1px solid #000;
          }
          .shuffle-btn {
            transform: rotate(2deg);
          }
          .start-btn {
            transform: rotate(-1deg);
          }
        `}</style>
      </div>
    );
  }
}

Intro.propTypes = {
  frame: React.PropTypes.object.isRequired,
  onShuffle: React.PropTypes.func.isRequired,
  onStart: React.PropTypes.func.isRequired,
};

Intro.contextTypes = {
  layout: React.PropTypes.object,
};

export default Intro;
