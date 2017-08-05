import React from 'react';
import PropTypes from 'prop-types';
import raf from 'raf';
import range from 'lodash.range';
import getStack from '../utils/stack';
import StackEntry from './stack-entry';
import PlaybackControls from './playback-controls';

const { round, floor, min } = Math;

const FPS = 60;
const TIME_PER_FRAME = 1000 / FPS;
const DELAY_TIME = 0.5;
const TRANSITION_TIME = 0.5;

const getFramesPerTime = time => FPS * time;

const FRAMES_PER_TRANSITION = getFramesPerTime(TRANSITION_TIME);
const FRAMES_PER_DELAY = getFramesPerTime(DELAY_TIME);
const FRAMES_PER_POS = FRAMES_PER_TRANSITION + FRAMES_PER_DELAY;

const getMaxPos = steps => (steps - 1) * FRAMES_PER_POS;

let _frames;

const computeAllFrames = (layout, steps, computeFrame) => {
  return steps.reduce((prev, next, stepIndex) => {
    const stack = getStack(steps, stepIndex);
    const transFrameNum = round(FPS * TRANSITION_TIME);
    const delayFrameNum = round(FPS * DELAY_TIME);
    const transFrames = range(transFrameNum).map(frame =>
      computeFrame(layout, stack, frame / (transFrameNum - 1)));
    const lastFrame = transFrames[transFrames.length - 1];
    const delayFrames = range(delayFrameNum).map(() => lastFrame);

    return [
      ...prev,
      ...transFrames,
      ...delayFrames,
    ];
  }, []);
};

class Player extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.onFrame = this.onFrame.bind(this);

    this.state = {
      pos: 0,
      isPlaying: false,
    };

    const {
      computeFrame,
      steps,
      actions,
    } = props;

    // Assumption: props.actions never change
    // Creating object here instead of render func to prevent invalidating shallow
    // prop comparison in children components
    this.actions = {
      ...actions,
      play: this.handlePlay,
      pause: this.handlePause,
    };

    _frames = computeAllFrames(context.layout, steps, computeFrame);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const {
      steps,
      computeFrame,
    } = nextProps;

    _frames = computeAllFrames(nextContext.layout, steps, computeFrame);
  }

  componentWillUnmount() {
    this.cancelAnimation();
  }

  handleScrollTo(pos) {
    this.setState({
      pos,
    });
  }

  handlePlay() {
    this.setState({
      isPlaying: true,
    }, this.scheduleAnimation);
  }

  handlePause() {
    this.setState({
      isPlaying: false,
    }, this.cancelAnimation);
  }

  scheduleAnimation() {
    this.cancelAnimation();
    this.prevTime = Date.now();
    this.requestFrame();
  }

  requestFrame() {
    this.animationHandle = raf(this.onFrame);
  }

  cancelAnimation() {
    raf.cancel(this.animationHandle);
  }

  onFrame() {
    const timeNow = Date.now();
    const frames = (timeNow - this.prevTime) / TIME_PER_FRAME;
    this.prevTime = timeNow;

    const {
      steps,
    } = this.props;
    const {
      pos,
    } = this.state;
    const maxPos = getMaxPos(steps.length);

    if (pos < maxPos) {
      const newPos = min(maxPos, pos + frames);

      this.setState({
        pos: newPos,
      }, this.requestFrame);
    } else {
      this.setState({
        isPlaying: false,
      });
    }
  }

  render() {
    const {
      algorithm,
      illustration,
      steps,
    } = this.props;
    const {
      pos,
      isPlaying,
    } = this.state;
    const {
      layout
    } = this.context;
    const {
      color,
      headerHeight,
      footerHeight,
    } = layout;

    const frame = _frames[floor(pos)];
    const {
      stack,
      entryHeight,
      entries,
    } = frame;

    return (
      <div>
        <div
          className="stack-entries"
          style={{
            height: stack.height,
            padding: `${headerHeight}px 0 ${footerHeight}px 0`,
            transform: `translate(0, ${stack.top}px)`,
          }}
        >
          {entries.map(entry => {
            const {
              entryId,
              opacity,
            } = entry;

            return (
              <div
                key={entryId}
                className="stack-entry-outer"
                style={{
                  height: entryHeight,
                  opacity,
                }}
              >
                <StackEntry
                  illustration={illustration}
                  code={algorithm.code}
                  frame={entry.frame}
                  actions={this.actions}
                />
              </div>
            );
          })}
        </div>
        {steps.length > 1 && (
          <div
            className="footer"
            style={{
              height: footerHeight,
              backgroundColor: color,
            }}
          >
            <PlaybackControls
              isPlaying={isPlaying}
              pos={pos}
              maxPos={getMaxPos(steps.length)}
              onPlay={this.handlePlay}
              onPause={this.handlePause}
              onScrollTo={this.handleScrollTo}
            />
          </div>
        )}
        <style jsx>{`
          .stack-entries {
            will-change: transform, height;
          }
          .stack-entry-outer {
            will-change: opacity;
          }
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            animation: slidein 1s;
          }
          @keyframes slidein {
            0% { transform: translate(0, 100%); }
            50% { transform: translate(0, 100%); }
            100% { transform: translate(0, 0); }
          }
        `}
        </style>
      </div>
    );
  }
}

Player.propTypes = {
  algorithm: PropTypes.func.isRequired,
  illustration: PropTypes.func.isRequired,
  computeFrame: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

Player.contextTypes = {
  layout: PropTypes.object,
};

export default Player;
