import React from 'react';
import raf from 'raf';
import getStack from '../utils/stack';
import StackEntry from './stack-entry';
import PlaybackControls from './playback-controls';

const { floor, min } = Math;

const FPS = 60;
const TIME_PER_FRAME = 1000 / FPS;
const DELAY_TIME = 0.5;
const TRANSITION_TIME = 0.5;

const getFramesPerTime = time => FPS * time;

const FRAMES_PER_TRANSITION = getFramesPerTime(TRANSITION_TIME);
const FRAMES_PER_DELAY = getFramesPerTime(DELAY_TIME);
const FRAMES_PER_POS = FRAMES_PER_TRANSITION + FRAMES_PER_DELAY;

const getMaxPos = steps => (steps - 1) * FRAMES_PER_POS;

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.onFrame = this.onFrame.bind(this);

    this.state = {
      pos: 0,
      isPlaying: false,
    };
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
      computeFrame,
      steps,
      actions,
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

    const stepIndex = floor(pos / FRAMES_PER_POS);
    const stepProgress = min(1, (pos % FRAMES_PER_POS) / FRAMES_PER_TRANSITION);
    const stack = getStack(steps, stepIndex);
    const frame = computeFrame(layout, stack, stepProgress);

    return (
      <div>
        <div
          className="stack-entries"
          style={{
            height: frame.stack.height,
            padding: `${headerHeight}px 0 ${footerHeight}px 0`,
            transform: `translate(0, ${frame.stack.top}px)`,
          }}
          >
          {stack.entries.map(({ prevStep, nextStep }, i) => {
            // Tieing stack entry elements to their parent step id will preserve
            // them when other entries are added to or removed from stack.
            const stackEntryKey = nextStep.parentStepId || 0;

            return (
              <div
                className="stack-entry-outer"
                key={stackEntryKey}
                style={{
                  height: frame.entryHeight,
                  opacity: frame.entries[i].opacity,
                }}
                >
                <StackEntry
                  illustration={illustration}
                  code={algorithm.code}
                  highlight={nextStep.highlight}
                  entryIndex={i}
                  frame={frame}
                  actions={{
                    ...actions,
                    play: this.handlePlay,
                    pause: this.handlePause,
                  }}
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
        `}</style>
      </div>
    );
  }
}

Player.propTypes = {
  algorithm: React.PropTypes.func.isRequired,
  illustration: React.PropTypes.func.isRequired,
  computeFrame: React.PropTypes.func.isRequired,
  steps: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
};

Player.contextTypes = {
  layout: React.PropTypes.object,
};

export default Player;
