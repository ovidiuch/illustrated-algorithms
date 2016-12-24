import React from 'react';
import isEqual from 'lodash.isequal';
import bfs from '../algorithms/bfs';
import SourceCode from '../components/source-code';
import Preview from '../components/preview';

class BinarySearch extends React.Component {
  static async getInitialProps() {
    const graph = {
      you: ['alice', 'bob', 'claire'],
      bob: ['anuj', 'peggy'],
      alice: ['peggy'],
      claire: ['thom', 'jonny'],
      anuj: [],
      peggy: [],
      thom: [],
      jonny: [],
    };

    return bfs(graph, 'you');
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

    const { line, start, end, context, returnValue } = steps[stepIndex];
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
          start={start}
          end={end}
        />
        <Preview
          context={context}
          changedKeys={Object.keys(context).filter(key => !isEqual(context[key], prevContext[key]))}
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

BinarySearch.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
};

export default BinarySearch;
