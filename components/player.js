import React from 'react';
import raf from 'raf';
import {
  transitionValue,
} from '../utils/transition';
import StackEntry from './stack-entry';

const { floor, min } = Math;

const FPS = 60;
const DELAY_TIME = 0.5;
const TRANSITION_TIME = 0.5;

const getFramesPerTime = time => FPS * time;

const FRAMES_PER_TRANSITION = getFramesPerTime(TRANSITION_TIME);
const FRAMES_PER_DELAY = getFramesPerTime(DELAY_TIME);
const FRAMES_PER_POS = FRAMES_PER_TRANSITION + FRAMES_PER_DELAY;

const getMaxPos = steps =>
  (steps * FRAMES_PER_TRANSITION) +
  ((steps - 1) * FRAMES_PER_DELAY);

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

    this.scheduleAnimation = this.scheduleAnimation.bind(this);
    this.onFrame = this.onFrame.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollStart = this.handleScrollStart.bind(this);
    this.handleScrollStop = this.handleScrollStop.bind(this);

    this.state = {
      pos: 0,
    };
  }

  componentDidMount() {
    this.scheduleAnimation();
  }

  componentWillUnmount() {
    this.cancelAnimation();
  }

  handleScroll(e) {
    this.setState({
      pos: Number(e.currentTarget.value),
    });
  }

  handleScrollStart() {
    this.cancelAnimation();
  }

  handleScrollStop() {
    // this.scheduleAnimation();
  }

  scheduleAnimation() {
    this.animationHandle = raf(this.onFrame);
  }

  cancelAnimation() {
    raf.cancel(this.animationHandle);
  }

  onFrame() {
    const {
      steps,
    } = this.props;
    const maxPos = getMaxPos(steps.length);
    const {
      pos,
    } = this.state;

    if (pos < maxPos - 1) {
      const newPos = min(maxPos - 1, pos + 1);

      this.setState({
        pos: newPos,
      }, this.scheduleAnimation);
    }
  }

  render() {
    const {
      steps,
      code,
      illustration,
    } = this.props;
    const {
      pos
    } = this.state;
    const {
      layout
    } = this.context;
    const {
      headerHeight,
      footerHeight,
    } = layout;

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

            // Tieing stack entry elements to their parnent step id will preserve
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
                  />
              </div>
            );
          })}
        </div>
        <div className="footer" style={{ height: footerHeight }}>
          <input
            type="range"
            min="0"
            max={getMaxPos(steps.length)}
            className="slider"
            value={pos}
            onMouseDown={this.handleScrollStart}
            onTouchStart={this.handleScrollStart}
            onMouseUp={this.handleScrollStop}
            onTouchEnd={this.handleScrollStop}
            onChange={this.handleScroll}
            />
        </div>
        <style jsx>{`
          .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
          }
          .slider {
            width: 100%;
            margin: 0;
          }
        `}</style>
      </div>
    );
  }
}

Player.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  illustration: React.PropTypes.func.isRequired,
};

Player.contextTypes = {
  layout: React.PropTypes.object,
};

export default Player;
