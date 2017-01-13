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
    illustrationHeight,
  } = layout;

  return (
    <div
      className="raw-data"
      style={{
        height: illustrationHeight,
        padding,
        fontSize,
        lineHeight: `${lineHeight}px`,
      }}
      >
      <div
        className="inner"
        style={{
          left: padding,
          right: padding,
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
      </div>
      <style jsx>{`
        .raw-data {
          position: relative;
          box-sizing: border-box;
        }
        .inner {
          position: absolute;
          top: 50%;
          transform: translate(0, -50%);
        }
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