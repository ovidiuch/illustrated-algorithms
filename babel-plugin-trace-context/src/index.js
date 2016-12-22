import template from 'babel-template';

const buildTemplate = template(`let __steps;
let __parentStepId;
let __lastStepId;

function __enterCall() {
  // Mark steps from sub call as decendends of last step from curr call
  __parentStepId = __lastStepId;
}

function __leaveCall() {
  if (__parentStepId) {
    // Revert step refs in parent callee
    __lastStepId = __parentStepId;
    __parentStepId = __steps[__parentStepId].parentStepId;
  }
}

function __trace({
  step,
  enterCall,
  leaveCall,
}) {
  if (enterCall) {
    __enterCall();
  }

  __steps.push({
    parentStepId: __parentStepId,
    ...step,
  });

  // Track last step id to reference back to entering a subcall
  __lastStepId = __steps.length - 1;

  if (leaveCall) {
    __leaveCall();
  }
}

ALGORITHM_BODY

module.exports = function (...args) {
  __steps = [];
  __parentStepId = undefined;
  __lastStepId = undefined;

  const returnValue = ALGORITHM_NAME(...args);
  return {
    steps: __steps,
    returnValue: returnValue,
    code: ALGORITHM_CODE,
  };
}`, {
  plugins: ['objectRestSpread']
});

export default function ({ types: t }) {
  function isNewlyCreatedPath(path) {
    return !path.node.loc;
  }

  function createTraceCall({
    start,
    end,
    context,
    enterCall,
    leaveCall,
    returnValue,
  }) {
    const stepProps = [
      t.objectProperty(t.identifier('start'), t.numericLiteral(start)),
      t.objectProperty(t.identifier('end'), t.numericLiteral(end)),
      t.objectProperty(t.identifier('context'), t.objectExpression(context.map(name =>
        t.objectProperty(t.identifier(name), t.identifier(name))
      ))),
    ];
    if (returnValue !== undefined) {
      stepProps.push(t.objectProperty(t.identifier('returnValue'), returnValue));
    }

    const args = [
      t.objectProperty(t.identifier('step'), t.objectExpression(stepProps)),
    ];
    if (enterCall) {
      args.push(t.objectProperty(t.identifier('enterCall'), t.booleanLiteral(true)));
    }
    if (leaveCall) {
      args.push(t.objectProperty(t.identifier('leaveCall'), t.booleanLiteral(true)));
    }

    return t.expressionStatement(t.callExpression(t.identifier('__trace'), [
      t.objectExpression(args)
    ]));
  }

  const innerVisitor = {
    /**
     * Append trace call() AFTER var declaration. Highlight contains entire
     * declaration.
     *
     * Created vars are pushed to visitor state to be included in context of
     * this and future trace() calls
     */
    VariableDeclaration(path) {
      // Ignore var declarations we create
      if (isNewlyCreatedPath(path)) {
        return;
      }

      this.bindings.push(
        ...path.node.declarations.map(d => d.id.name)
          .filter(d => this.bindings.indexOf(d) === -1)
      );

      const { start, end } = path.node;
      path.insertAfter(createTraceCall({
        start,
        end,
        context: this.bindings,
      }));
    },
    /**
     * Append trace call() AFTER assignment expressions. Highlight contains
     * entire expression. Context includes new values.
     */
    AssignmentExpression(path) {
      const { start, end } = path.node;
      path.insertAfter(createTraceCall({
        start,
        end,
        context: this.bindings,
      }));
    },
    /**
     * Replace test expressions with IIFE containing trace() call BEFORE
     * test value has been computed. Highlight contains test expression only.
     */
    'WhileStatement|IfStatement'(path) {
      const testPath = path.get('test');
      const { start, end } = testPath.node;
      testPath.replaceWith(
        t.callExpression(
          t.arrowFunctionExpression([],
            t.blockStatement([
              createTraceCall({
                start,
                end,
                context: this.bindings,
              }),
              t.returnStatement(testPath.node)
            ])
          ),
        [])
      );
    },
    /**
     * Replace call expressions with IIFE containing trace() call BEFORE
     * return value has been computed. Highlight contains call expression only.
     */
    CallExpression(path) {
      if (
        path.node.callee.name !== this.fnName ||
        // This prevents an infinite loop
        this.processedCallExpressions.indexOf(path.node) !== -1
      ) {
        return;
      }

      this.processedCallExpressions.push(path.node);

      const { start, end } = path.node;
      path.replaceWith(
        t.callExpression(
          t.arrowFunctionExpression([],
            t.blockStatement([
              createTraceCall({
                start,
                end,
                context: this.bindings,
              }),
              t.returnStatement(path.node)
            ])
          ),
        [])
      );
    },
    /**
     * Replace return calls with IIFE containing trace(leave) call AFTER return
     * value has been computed, before it is returned. Highlight contains
     * entire return statement.
     */
    ReturnStatement(path) {
      // Ignore return statements we create
      if (isNewlyCreatedPath(path)) {
        return;
      }

      const returnValId = path.scope.generateUidIdentifier('uid');
      const argumentPath = path.get('argument');
      const { start, end } = path.node;
      argumentPath.replaceWith(
        t.callExpression(
          t.arrowFunctionExpression([],
            t.blockStatement([
              t.variableDeclaration('const', [
                t.variableDeclarator(returnValId, argumentPath.node)
              ]),
              createTraceCall({
                start,
                end,
                context: this.bindings,
                leaveCall: true,
                returnValue: returnValId,
              }),
              t.returnStatement(returnValId)
            ])
          ),
        [])
      );
    },
  };

  return {
    visitor: {
      ExportDefaultDeclaration(path) {
        const fnPath = path.get('declaration');
        const fnName = fnPath.node.id.name;

        path.replaceWithMultiple(
          buildTemplate({
            ALGORITHM_NAME: t.identifier(fnName),
            ALGORITHM_BODY: fnPath.node,
            // TODO: Remove "export default" wrapper and other functions.
            // Remember to offset start/end pairs
            ALGORITHM_CODE: t.stringLiteral(path.hub.file.code),
          })
        );

        const bodyPath = fnPath.get('body');
        const params = Object.keys(bodyPath.scope.getAllBindingsOfKind('param'));
        const start = fnPath.get('id').node.start;
        const end = fnPath.node.params[fnPath.node.params.length - 1].end + 1;
        bodyPath.unshiftContainer('body', createTraceCall({
          start,
          end,
          context: params,
          enterCall: true,
        }));

        fnPath.traverse(innerVisitor, {
          fnName,
          bindings: params,
          processedCallExpressions: [],
        });
      }
    },
  };
}
