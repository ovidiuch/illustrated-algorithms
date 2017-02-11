import React from 'react';
import raf from 'raf';
import getStack from '../utils/stack';
import {
  transitionValue,
} from '../utils/transition';
import {
  getStackEntryHeight,
  getContentHeight,
  getContentTopOffset,
} from '../layout/base';
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

const getOpacityForStackDepth = level => {
  return level > 0 ? 0.5 : 1;
};

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
    const { entries, isAddingToStack, isRemovingFromStack } = getStack(steps, stepIndex);

    const stackEntryHeight = getStackEntryHeight(layout);
    const contentHeight = getContentHeight(layout, entries.length);

    let topOffset;
    let topStackEntryOpacity;

    if (isAddingToStack) {
      topOffset = transitionValue(
        getContentTopOffset(layout, entries.length - 1) - stackEntryHeight,
        getContentTopOffset(layout, entries.length),
        stepProgress
      );
      topStackEntryOpacity = transitionValue(0, 1, stepProgress);
    } else if (isRemovingFromStack) {
      topOffset = transitionValue(
        getContentTopOffset(layout, entries.length),
        getContentTopOffset(layout, entries.length - 1) - stackEntryHeight,
        stepProgress
      );
      topStackEntryOpacity = transitionValue(1, 0, stepProgress);
    } else {
      topOffset = getContentTopOffset(layout, entries.length);
      topStackEntryOpacity = 1;
    }

    return (
      <div>
        <div
          className="stack-entries"
          style={{
            height: contentHeight,
            padding: `${headerHeight}px 0 ${footerHeight}px 0`,
            transform: `translate(0, ${topOffset}px)`,
          }}
          >
          {entries.map(({ prevStep, nextStep }, i) => {
            let opacity;

            if (i === 0) {
              opacity = topStackEntryOpacity;
            } else if (isAddingToStack) {
              opacity = transitionValue(
                getOpacityForStackDepth(i - 1),
                getOpacityForStackDepth(i),
                stepProgress,
              );
            } else if (isRemovingFromStack) {
              opacity = transitionValue(
                getOpacityForStackDepth(i),
                getOpacityForStackDepth(i - 1),
                stepProgress,
              );
            } else {
              opacity = getOpacityForStackDepth(i);
            }

            // Tieing stack entry elements to their parent step id will preserve
            // them when other entries are added to or removed from stack.
            const stackEntryKey = nextStep.parentStepId || 0;
            // Only top entry needs to animate (and the one below when top is
            // being removed from the stack). Any other entry is frozen
            const stackEntryStepProgress = i > 1 ? 1 : stepProgress;

            return (
              <div
                className="stack-entry-outer"
                key={stackEntryKey}
                style={{
                  height: stackEntryHeight,
                  opacity,
                }}
                >
                <StackEntry
                  illustration={illustration}
                  code={algorithm.code}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  stepProgress={stackEntryStepProgress}
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
  steps: React.PropTypes.array.isRequired,
  actions: React.PropTypes.object.isRequired,
};

Player.contextTypes = {
  layout: React.PropTypes.object,
};

export default Player;
