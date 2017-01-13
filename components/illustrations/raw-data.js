import React from 'react';

export default function RawData({
  nextStep,
}, {
  layout
}) {
  const {
    bindings,
    returnValue,
  } = nextStep;
  const {
    padding,
    fontSize,
    lineHeight,
  } = layout;

  return (
    <div
      style={{
        padding,
        fontSize,
        lineHeight: `${lineHeight}px`,
      }}
      >
      {Object.keys(bindings).map(key =>
        <pre
          key={key}
          style={{ padding }}
          >
          {key} = {JSON.stringify(bindings[key])}
        </pre>
      )}
      {returnValue !== undefined && (
        <pre
          className="return-value"
          style={{ padding }}
          >
          {JSON.stringify(returnValue)}
        </pre>
      )}
      <style jsx>{`
        pre {
          margin: 0;
          background: rgba(0, 0, 0, 0.5);
          color: white;
          font-family: 'FiraCode-Light', monospace;
          white-space: pre-wrap;
        }
        .return-value {
          background: rgba(0, 0, 0, 0.8);
        }
      `}</style>
    </div>
  );
}

RawData.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
};

RawData.contextTypes = {
  layout: React.PropTypes.object,
};
