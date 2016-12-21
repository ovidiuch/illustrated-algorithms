import React from 'react';
import binarySearch from '../algorithms/binary-search';
import SourceCode from '../components/source-code';
import Preview from '../components/preview';

class App extends React.Component {
  static async getInitialProps() {
    const items = [
      'bear', 'cat', 'cow', 'dog', 'fox', 'pig', 'rat',
    ];
    return binarySearch(items, 'fox');
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

  render() {
    const { steps, code } = this.props;
    const { stepIndex } = this.state;

    const { line, context, returnValue } = steps[stepIndex];
    const prevStep = steps[stepIndex - 1];
    const prevContext = prevStep ? prevStep.context : {};

    return (
      <div>
        <div>
          <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
        </div>
        <SourceCode
          def={code}
          line={line}
        />
        <Preview
          context={context}
          changedKeys={Object.keys(context).filter(key => context[key] !== prevContext[key])}
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

App.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
};

export default App;
