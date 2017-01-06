import React from 'react';
import SourceCode from '../components/source-code';

class Player extends React.Component {
  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }

  handlePrev() {
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    });
  }

  handleNext() {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    });
  }

  render() {
    const {
      steps,
      code,
      illustration,
    } = this.props;
    const {
      stepIndex
    } = this.state;
    const {
      footerHeight,
      sideWidth,
    } = this.context.layout;

    const step = steps[stepIndex];
    const { start, end } = step;

    return (
      <div>
        <div>
          <div className="content" style={{ paddingBottom: footerHeight }}>
            <div className="stack-entry">
              <div className="illustration" style={{ width: sideWidth }}>
                {React.createElement(illustration, { step })}
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
            <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
            <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
          </div>
          <style jsx>{`
            .content {}
            .stack-entry {}
            .illustration,
            .code {
              float: left;
            }
            .footer {
              position: fixed;
              bottom: 0;
              left: 0;
              right: 0;
              height: 20px;
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
