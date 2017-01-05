import React from 'react';
import isEqual from 'lodash.isequal';
import quicksort from '../algorithms/quicksort';
import Layout from '../components/layout';
import SourceCode from '../components/source-code';
import Preview from '../components/preview';

class StackEntry extends React.Component {
  render() {
    const { code, currStep, prevStep } = this.props;
    const { start, end, bindings, returnValue } = currStep;
    const prevBindings = prevStep ? prevStep.bindings : {};

    return (
      <div>
        <SourceCode
          def={code}
          start={start}
          end={end}
          />
        <Preview
          bindings={bindings}
          changedKeys={Object.keys(bindings).filter(key => !isEqual(bindings[key], prevBindings[key]))}
          returnValue={returnValue}
          />
        {returnValue !== undefined && (
          <pre style={{ backgroundColor: 'gray', color: 'white' }}>
            Return: {JSON.stringify(returnValue)}
          </pre>
        )}
      </div>
    );
  }
}

StackEntry.propTypes = {
  code: React.PropTypes.string.isRequired,
  currStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
};

class Quicksort extends React.Component {
  static async getInitialProps() {
    const items = [
      'dog', 'cat', 'cow', 'fox', 'bear', 'pig', 'rat'
    ];
    return quicksort(items);
  }

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

  getPrevStep(stepIndex) {
    const { steps } = this.props;

    if (stepIndex <= 0) {
      return;
    }

    const currStep = steps[stepIndex];
    let prevStepIndex = stepIndex - 1;
    let prevStep = steps[prevStepIndex];

    while (prevStepIndex >= 0 && prevStep.parentStepId !== currStep.parentStepId) {
      prevStepIndex -= 1;
      prevStep = steps[prevStepIndex];
    }

    return prevStep;
  }

  render() {
    const { steps, code, url } = this.props;
    const { stepIndex } = this.state;

    const stackEntries = [];
    let currStepIndex = stepIndex;
    let currStep = steps[currStepIndex];
    let prevStep;

    while (currStep) {
      prevStep = this.getPrevStep(currStepIndex);

      stackEntries.push(
        <StackEntry
          key={currStepIndex}
          code={code}
          currStep={currStep}
          prevStep={prevStep}
          />
      );

      currStepIndex = currStep.parentStepId;
      currStep = steps[currStepIndex];
    }

    return (
      <Layout color="#CCFF90" pathname={url.pathname}>
        <div>
          <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
        </div>
        {stackEntries}
      </Layout>
    );
  }
}

Quicksort.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default Quicksort;
