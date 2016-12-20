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
    type: 'assign',
    line: 1,
    context: { list, item, low },
  });

  let high = list.length - 1;
  trace({
    type: 'assign',
    line: 2,
    context: { list, item, low, high },
  });

  while (trace({
    type: 'compare',
    line: 4,
    context: { list, item, low, high },
    compared: ['low', 'high'],
  }) && low <= high) {
    const mid = Math.round((low + high) / 2);
    trace({
      type: 'assign',
      line: 5,
      context: { list, item, low, high, mid },
    });

    const guess = list[mid];
    trace({
      type: 'assign',
      line: 6,
      context: { list, item, low, high, mid, guess },
    });

    trace({
      type: 'compare',
      line: 8,
      context: { list, item, low, high, mid, guess },
      compared: ['guess', 'item'],
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
      type: 'compare',
      line: 11,
      context: { list, item, low, high, mid, guess },
      compared: ['guess', 'item'],
    });
    if (guess > item) {
      high = mid - 1;
      trace({
        type: 'assign',
        line: 12,
        context: { list, item, low, high, mid, guess },
      });
    } else {
      low = mid + 1;
      trace({
        type: 'assign',
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

binarySearch(items, 'bear');

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
}) {
  return (
    <pre style={{ backgroundColor: 'lightgray' }}>
      {Object.keys(context).map(key =>
        <div key={key}>
          {key} = {JSON.stringify(context[key])}
        </div>
      )}
    </pre>
  );
}

Preview.propTypes = {
  context: React.PropTypes.object.isRequired,
};

class App extends React.Component {
  render() {
    const { steps, step, onPrev, onNext } = this.props;
    const { line, context } = steps[step];

    return (
      <div>
        <div>
          <button disabled={step <= 0} onClick={onPrev}>back</button>
          <button disabled={step >= steps.length - 1} onClick={onNext}>forward</button>
        </div>
        <SourceCode
          def={fnDef}
          line={line}
        />
        <Preview
          context={context}
        />
      </div>
    );
  }
}

App.propTypes = {
  steps: React.PropTypes.array.isRequired,
  step: React.PropTypes.number.isRequired,
  onPrev: React.PropTypes.func.isRequired,
  onNext: React.PropTypes.func.isRequired,
};

/* global document */
const container = document.body.appendChild(document.createElement('div'));
let currentStep = 0;

function render(step) {
  ReactDOM.render((
    <App
      steps={steps}
      step={step}
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
