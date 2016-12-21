import template from 'babel-template';

const buildTemplate = template(`const __steps = [];
let __callCount = 0;

function __trace(step) {
  if (step.incrementCallCount) {
    __callCount++;
  }

  __steps.push({
    callCount: __callCount,
    ...step,
  });
}

module.exports = function __exportSteps(...args) {
  ALGORITHM(...args);
  return __steps;
}`, {
  plugins: ['objectRestSpread']
});

export default function ({ types: t }) {
  function getPathLine(path) {
    return path.node.loc.start.line;
  }

  function createTraceCall({
    line,
    context,
    incrementCallCount,
    returnValue,
  }) {
    const args = [
      t.objectProperty(t.identifier('line'), t.numericLiteral(line)),
      t.objectProperty(t.identifier('context'), t.objectExpression(context.map(name =>
        t.objectProperty(t.identifier(name), t.identifier(name))
      ))),
    ];
    if (incrementCallCount) {
      args.push(
        t.objectProperty(t.identifier('incrementCallCount'), t.booleanLiteral(true)),
      );
    }
    if (returnValue) {
      args.push(
        t.objectProperty(t.identifier('returnValue'), returnValue),
      );
    }

    return t.callExpression(t.identifier('__trace'), [
      t.objectExpression(args)
    ]);
  }

  const innerVisitor = {
    VariableDeclaration(path) {
      this.bindings.push(
        ...path.node.declarations.map(d => d.id.name)
          .filter(d => this.bindings.indexOf(d) === -1)
      );

      path.insertAfter(createTraceCall({
        line: getPathLine(path),
        context: this.bindings,
      }));
    },
    AssignmentExpression(path) {
      path.insertAfter(createTraceCall({
        line: getPathLine(path),
        context: this.bindings,
      }));
    },
    ReturnStatement(path) {
      path.insertBefore(createTraceCall({
        line: getPathLine(path),
        context: this.bindings,
        returnValue: path.node.argument,
      }));
    }
  };

  return {
    // We assume only one fn per algorithm!
    visitor: {
      FunctionDeclaration(path) {
        // Ignore trace template and Babel helpers
        if (path.node.id.name.indexOf('_') === 0) {
          return;
        }

        const bodyPath = path.get('body');
        const params = Object.keys(bodyPath.scope.getAllBindingsOfKind('param'));
        bodyPath.unshiftContainer('body', createTraceCall({
          line: getPathLine(bodyPath),
          context: params,
          incrementCallCount: true,
        }));

        path.insertBefore(buildTemplate({
          ALGORITHM: t.identifier(path.node.id.name),
        }));

        path.traverse(innerVisitor, { bindings: params });
      }
    },
  };
}
