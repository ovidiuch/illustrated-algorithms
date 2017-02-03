import React, { createElement } from 'react';
import PureLayoutComponent from '../utils/pure-layout-component';
import SourceCode from './source-code';

const { max, round } = Math;

class StackEntry extends PureLayoutComponent {
  render() {
    const {
      illustration,
      code,
      prevStep,
      nextStep,
      stepProgress,
      onGenerateSteps,
    } = this.props;
    const { highlight } = nextStep;
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
      Object.assign(illustrationStyle, {
        display: 'table-cell',
        paddingTop: max(0, round((codeHeight - illustrationHeight) / 2)),
        verticalAlign: 'top'
      });

      Object.assign(codeStyle, {
        display: 'table-cell',
        paddingTop: max(0, round((illustrationHeight - codeHeight) / 2)),
        verticalAlign: 'top'
      });
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
            stepProgress,
            onGenerateSteps,
          })}
        </div>
        <div
          className="side"
          style={codeStyle}
          >
          <SourceCode
            def={code}
            highlight={highlight}
            />
        </div>
        <style jsx>{`
          .side {
            text-align: center;
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
  onGenerateSteps: React.PropTypes.func.isRequired,
};

StackEntry.contextTypes = {
  layout: React.PropTypes.object,
};

export default StackEntry;
