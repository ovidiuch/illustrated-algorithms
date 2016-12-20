const steps = [];
let callCount = 0;

function trace(step) {
  const { type, context } = step;

  if (type === 'enter') {
    callCount++;
  }

  steps.push({
    callCount,
    ...step,
  });

  return context;
}

function binarySearch(list, item) {
  trace({
    type: 'enter',
    line: 0,
    context: { list, item },
  });

  let low = 0;
  trace({
    line: 1,
    context: { list, item, low },
  });

  let high = list.length - 1;
  trace({
    line: 2,
    context: { list, item, low, high },
  });

  while (trace({
    line: 4,
    context: { list, item, low, high },
  }) && low <= high) {
    const mid = Math.round((low + high) / 2);
    trace({
      line: 5,
      context: { list, item, low, high, mid },
    });

    const guess = list[mid];
    trace({
      line: 6,
      context: { list, item, low, high, mid, guess },
    });

    trace({
      line: 8,
      context: { list, item, low, high, mid, guess },
    });
    if (guess === item) {
      trace({
        type: 'return',
        line: 9,
        context: { list, item, low, high, mid, guess },
        returnValue: mid,
      });
      return mid;
    }

    trace({
      line: 11,
      context: { list, item, low, high, mid, guess },
    });
    if (guess > item) {
      high = mid - 1;
      trace({
        line: 12,
        context: { list, item, low, high, mid, guess },
      });
    } else {
      low = mid + 1;
      trace({
        line: 14,
        context: { list, item, low, high, mid, guess },
      });
    }
  }

  trace({
    type: 'return',
    line: 18,
    context: { list, item, low, high },
    returnValue: null,
  });
  return null;
}

const items = [
  'bear', 'cat', 'cow', 'dog', 'fox', 'pig', 'rat',
];

binarySearch(items, 'fox');

const React = require('react');
const ReactDOM = require('react-dom');

const fnDef =
`function binarySearch(list, item) {
  let low = 0;
  let high = list.length - 1;

  while (low <= high) {
    const mid = Math.round((low + high) / 2);
    const guess = list[mid];

    if (guess === item) {
      return mid;
    }
    if (guess > item) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }
  }

  return null;
}`;

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
            style={{ backgroundColor: i === line ? 'yellow' : 'white' }}
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
    const { type, line, context, returnValue } = steps[stepIndex];
    const prevStep = steps[stepIndex - 1];
    const prevContext = prevStep ? prevStep.context : {};

    return (
      <div>
        <div>
          <button disabled={stepIndex <= 0} onClick={onPrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={onNext}>forward</button>
        </div>
        <SourceCode
          def={fnDef}
          line={line}
        />
        <Preview
          context={context}
          changedKeys={Object.keys(context).filter(key => context[key] !== prevContext[key])}
          returnValue={returnValue}
        />
        {type === 'return' && (
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
