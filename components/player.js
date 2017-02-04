import React from 'react';
import raf from 'raf';
import {
  transitionValue,
} from '../utils/transition';
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

const getMaxPos = steps =>
  (steps * FRAMES_PER_TRANSITION) +
  ((steps - 1) * FRAMES_PER_DELAY) - 1;

const getPrevStepFromSameStackEntry = (steps, stepIndex) => {
  if (stepIndex <= 0) {
    return;
  }

  const nextStep = steps[stepIndex];
  let prevStepIndex = stepIndex - 1;
  let prevStep = steps[prevStepIndex];

  while (prevStepIndex >= 0 && prevStep.parentStepId !== nextStep.parentStepId) {
    prevStepIndex -= 1;
    prevStep = steps[prevStepIndex];
  }

  return prevStep;
};

const getStackEntries = (steps, pos) => {
  const entries = [];

  let stepIndex = floor(pos / FRAMES_PER_POS);
  let nextStep = steps[stepIndex];
  const stepProgress = min(1, (pos - (stepIndex * FRAMES_PER_POS)) / FRAMES_PER_TRANSITION);

  while (nextStep) {
    const prevStep = getPrevStepFromSameStackEntry(steps, stepIndex);

    entries.push([
      prevStep,
      nextStep,
      entries.length > 0 ? 1 : stepProgress,
    ]);

    stepIndex = nextStep.parentStepId;
    nextStep = steps[stepIndex];
  }

  return entries;
};

const getOpacityForStackDepth = level => {
  return level > 0 ? 0.5 : 1;
};

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleScrollTo = this.handleScrollTo.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleGenerateSteps = this.handleGenerateSteps.bind(this);
    this.onFrame = this.onFrame.bind(this);

    this.state = {
      pos: 0,
      isPlaying: false,
      steps: props.steps || [this.getIntroStep()],
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

  handleGenerateSteps(steps) {
    this.setState({
      steps: [this.getIntroStep(), ...steps],
      pos: 0,
      isPlaying: true,
    }, this.scheduleAnimation);
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

  getIntroStep() {
    return {
      intro: true,
      bindings: {
        ...this.props.illustration.initialData,
      },
    };
  }

  render() {
    const {
      illustration,
      code,
    } = this.props;
    const {
      steps,
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

    const isIntro = steps.length === 1;
    const stackEntries = getStackEntries(steps, pos);
    const stackEntryHeight = layout.getStackEntryHeight();
    const contentHeight = layout.getContentHeight(stackEntries.length);

    const topStackEntry = stackEntries[0];
    const [topPrevStep, topNextStep, topStepProgress] = topStackEntry;
    const isAddingToStack = stackEntries.length > 1 && !topPrevStep;
    const isRemovingFromStack = stackEntries.length > 1 && topNextStep.returnValue !== undefined;

    let topOffset;
    let topStackEntryOpacity;

    if (isAddingToStack) {
      topOffset = transitionValue(
        layout.getContentTopOffset(stackEntries.length - 1) - stackEntryHeight,
        layout.getContentTopOffset(stackEntries.length),
        topStepProgress
      );
      topStackEntryOpacity = transitionValue(0, 1, topStepProgress);
    } else if (isRemovingFromStack) {
      topOffset = transitionValue(
        layout.getContentTopOffset(stackEntries.length),
        layout.getContentTopOffset(stackEntries.length - 1) - stackEntryHeight,
        topStepProgress
      );
      topStackEntryOpacity = transitionValue(1, 0, topStepProgress);
    } else {
      topOffset = layout.getContentTopOffset(stackEntries.length);
      topStackEntryOpacity = 1;
    }

    return (
      <div>
        <div
          style={{
            height: contentHeight,
            padding: `${headerHeight}px 0 ${footerHeight}px 0`,
            transform: `translate(0, ${topOffset}px)`,
          }}
          >
          {stackEntries.map(([prevStep, nextStep, stepProgress], i) => {
            let opacity;

            if (i === 0) {
              opacity = topStackEntryOpacity;
            } else if (isAddingToStack) {
              opacity = transitionValue(
                getOpacityForStackDepth(i - 1),
                getOpacityForStackDepth(i),
                topStepProgress,
              );
            } else if (isRemovingFromStack) {
              opacity = transitionValue(
                getOpacityForStackDepth(i),
                getOpacityForStackDepth(i - 1),
                topStepProgress,
              );
            } else {
              opacity = getOpacityForStackDepth(i);
            }

            // Tieing stack entry elements to their parent step id will preserve
            // them when other entries are added to or removed from stack.
            const stackEntryKey = nextStep.parentStepId || 0;

            return (
              <div
                key={stackEntryKey}
                style={{
                  height: stackEntryHeight,
                  opacity,
                }}
                >
                <StackEntry
                  illustration={illustration}
                  code={code}
                  prevStep={prevStep}
                  nextStep={nextStep}
                  stepProgress={stepProgress}
                  onGenerateSteps={this.handleGenerateSteps}
                  />
              </div>
            );
          })}
        </div>
        {!isIntro && (
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
  code: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array,
  illustration: React.PropTypes.func.isRequired,
};

Player.contextTypes = {
  layout: React.PropTypes.object,
};

export default Player;
