import binarySearch from './algorithms/binary-search';

const items = [
  'bear', 'cat', 'cow', 'dog', 'fox', 'pig', 'rat',
];
const { steps, code } = binarySearch(items, 'fox');

const React = require('react');
const ReactDOM = require('react-dom');

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
  render() {
    const { steps, stepIndex, onPrev, onNext } = this.props;
    const { line, context, returnValue } = steps[stepIndex];
    const prevStep = steps[stepIndex - 1];
    const prevContext = prevStep ? prevStep.context : {};

    return (
      <div>
        <div>
          <button disabled={stepIndex <= 0} onClick={onPrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={onNext}>forward</button>
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
  stepIndex: React.PropTypes.number.isRequired,
  onPrev: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
};

/* global document */
const container = document.body.appendChild(document.createElement('div'));
let currentStep = 0;

function render(stepIndex) {
  ReactDOM.render((
    <App
      steps={steps}
      stepIndex={stepIndex}
      onPrev={() => {
        render(currentStep -= 1);
      }}
      onNext={() => {
        render(currentStep += 1);
      }}
    />
  ), container);
}

render(currentStep);
