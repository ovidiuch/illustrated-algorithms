import React from 'react';
import binarySearch from '../algorithms/binary-search';

function SourceCode({
  def,
  line,
}) {
  return (
    <pre>
      <ol>
        {def.split('\n').map((fnLine, i) =>
          <li
            key={i}
            style={{ backgroundColor: i === line - 1 ? 'yellow' : 'white' }}
          >
            {fnLine}
          </li>
        )}
      </ol>
    </pre>
  );
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  line: React.PropTypes.number.isRequired,
};

function Preview({
  context,
  changedKeys,
}) {
  return (
    <pre style={{ backgroundColor: 'lightgray' }}>
      {Object.keys(context).map(key =>
        <div key={key}>
          <span
            style={{ fontWeight: changedKeys.indexOf(key) === -1 ? 'normal' : 'bold'}}
          >
            {key} = {JSON.stringify(context[key])}
          </span>
        </div>
      )}
    </pre>
  );
}

Preview.propTypes = {
  context: React.PropTypes.object.isRequired,
  changedKeys: React.PropTypes.array.isRequired,
};

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
