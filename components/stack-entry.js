import React, { createElement } from 'react';
import SourceCode from './source-code';

const { max, round } = Math;

class StackEntry extends React.Component {
  render() {
    const {
      illustration,
      code,
      prevStep,
      nextStep,
      stepProgress,
    } = this.props;
    const { start, end } = nextStep;
    const {
      layout
    } = this.context;
    const {
      landscape,
      sideWidth,
      illustrationHeight,
      codeHeight,
    } = layout;

    const illustrationStyle = {
      width: sideWidth,
      height: illustrationHeight,
    };
    const codeStyle = {
      width: sideWidth,
      height: codeHeight,
    };

    if (landscape) {
      illustrationStyle.paddingTop = max(0, round((codeHeight - illustrationHeight) / 2));
      codeStyle.paddingTop = max(0, round((illustrationHeight - codeHeight) / 2));
    }

    return (
      <div>
        <div
          className="side"
          style={illustrationStyle}
          >
          {createElement(illustration, {
            prevStep,
            nextStep,
            stepProgress
          })}
        </div>
        <div
          className="side"
          style={codeStyle}
          >
          <SourceCode
            def={code}
            start={start}
            end={end}
            />
        </div>
        <style jsx>{`
          .side {
            float: left;
          }
        `}</style>
      </div>
    );
  }
}

StackEntry.propTypes = {
  code: React.PropTypes.string.isRequired,
  illustration: React.PropTypes.func.isRequired,
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number,
};

StackEntry.contextTypes = {
  layout: React.PropTypes.object,
};

export default StackEntry;
