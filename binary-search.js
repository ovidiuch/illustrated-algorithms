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
  let outerContext = trace({
    type: 'enter',
    line: 0,
    context: { list, item },
  });

  let low = 0;
  outerContext = trace({
    type: 'assign',
    line: 1,
    context: {
      ...outerContext,
      low,
    },
  });

  let high = list.length - 1;
  outerContext = trace({
    type: 'assign',
    line: 2,
    context: {
      ...outerContext,
      high,
    }
  });

  // TODO: Keep this context inside while block, but udpate low/high in the
  // outer context
  let innerContext = { ...outerContext };
  while (trace({
    type: 'compare',
    line: 4,
    context: innerContext,
    compared: ['low', 'high'],
  }) && low <= high) {
    const mid = Math.round((low + high) / 2);
    innerContext = trace({
      type: 'assign',
      line: 5,
      context: {
        ...innerContext,
        mid,
      },
    });

    const guess = list[mid];
    innerContext = trace({
      type: 'assign',
      line: 6,
      context: {
        ...innerContext,
        guess,
      },
    });

    trace({
      type: 'compare',
      line: 8,
      context: innerContext,
      compared: ['guess', 'item'],
    });
    if (guess === item) {
      trace({
        type: 'return',
        line: 9,
        context: innerContext,
        returnValue: mid,
      });
      return mid;
    }

    trace({
      type: 'compare',
      line: 11,
      context: innerContext,
      compared: ['guess', 'item'],
    });
    if (guess > item) {
      high = mid - 1;
      innerContext = trace({
        type: 'assign',
        line: 12,
        context: {
          ...innerContext,
          high,
        }
      });
    } else {
      low = mid + 1;
      innerContext = trace({
        type: 'assign',
        line: 14,
        context: {
          ...innerContext,
          low,
        }
      });
    }
  }

  trace({
    type: 'return',
    line: 18,
    context: outerContext,
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
    const mid = Math.round(low + high);
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
