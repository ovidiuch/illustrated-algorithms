import React from 'react';
import SourceCode from '../components/source-code';

const FPS = 60;
const DELAY_TIME = 1;
const TRANSITION_TIME = 0.5;

const getFramesPerTime = time => FPS * time;

const FRAMES_PER_TRANSITION = getFramesPerTime(TRANSITION_TIME);
const FRAMES_PER_DELAY = getFramesPerTime(DELAY_TIME);
const FRAMES_PER_POS = FRAMES_PER_TRANSITION + FRAMES_PER_DELAY;

const getMaxPos = steps =>
  (steps * FRAMES_PER_TRANSITION) +
  ((steps - 1) * FRAMES_PER_DELAY);

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handleScroll = this.handleScroll.bind(this);
    this.handleScrollStart = this.handleScrollStart.bind(this);
    this.handleScrollStop = this.handleScrollStop.bind(this);

    this.state = {
      pos: 0,
      isScrolling: false,
    };
  }

  componentDidMount() {
    this.startInterval();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  handleScroll(e) {
    this.setState({
      pos: Number(e.currentTarget.value),
    });
  }

  handleScrollStart() {
    this.setState({
      isScrolling: true,
    });
  }

  handleScrollStop() {
    this.setState({
      isScrolling: false,
    });
  }

  startInterval() {
    const {
      steps,
    } = this.props;
    const maxPos = getMaxPos(steps.length);

    // TODO: Use rAF
    this.intervalId = setInterval(() => {
      const {
        pos,
        isScrolling,
      } = this.state;

      if (!isScrolling && pos < maxPos) {
        const newPos = pos + 1;

        this.setState({
          pos: newPos,
        });
      }
    }, 1000 / FPS);
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
      footerHeight,
      sideWidth,
    } = this.context.layout;

    const maxPos = getMaxPos(steps.length);
    const stepIndex = Math.floor(pos / FRAMES_PER_POS);
    const stepProgress = Math.min(1, (pos - (stepIndex * FRAMES_PER_POS)) / FRAMES_PER_TRANSITION);

    const nextStep = steps[stepIndex];
    const prevStep = stepIndex > 0 ? steps[stepIndex - 1] : undefined;
    const { start, end } = nextStep;

    return (
      <div>
        <div>
          <div className="content" style={{ paddingBottom: footerHeight }}>
            <div className="stack-entry">
              <div className="illustration" style={{ width: sideWidth }}>
                {React.createElement(illustration, { prevStep, nextStep, stepProgress })}
              </div>
              <div className="code" style={{ width: sideWidth }}>
                <SourceCode
                  def={code}
                  start={start}
                  end={end}
                  />
              </div>
            </div>
          </div>
          <div className="footer" style={{ height: footerHeight }}>
            <input
              type="range"
              min="0"
              max={maxPos}
              className="slider"
              value={pos}
              onMouseDown={this.handleScrollStart}
              onMouseUp={this.handleScrollStop}
              onChange={this.handleScroll}
              />
          </div>
          <style jsx>{`
            .content {}
            .stack-entry {
              overflow: hidden;
            }
            .illustration,
            .code {
              float: left;
            }
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
