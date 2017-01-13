import React from 'react';

const { min, max } = Math;

export default function SourceCode({
  def,
  start,
  end,
}, {
  layout,
}) {
  const {
    padding,
    codeFontSize,
    codeLineHeight,
  } = layout;
  let lineStart = 0;
  return (
    <pre
      style={{
        padding: `${padding}px 0`,
        fontSize: codeFontSize,
        lineHeight: `${codeLineHeight}px`,
      }}
      >
      {def.split('\n').map((fnLine, i) => {
        const lineLen = fnLine.length;
        const lineEnd = lineStart + lineLen;
        const isRangeInLine = start < lineEnd && end > lineStart;
        const relStart = max(0, start - lineStart);
        const relEnd = min(end - lineStart, lineLen);
        lineStart += lineLen + 1; // account for newlines removed

        return (
          <div
            key={i}
            style={{ backgroundColor: isRangeInLine ? 'rgba(255, 255, 255, 0.4)' : 'transparent' }}
            >
            <span style={{ opacity: 0.5 }}>{i < 10 && ' '}{`${i}. `}</span>
            {isRangeInLine ? (
              <span>
                <span>{fnLine.slice(0, relStart)}</span>
                <span style={{ backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                  {fnLine.slice(relStart, relEnd)}
                </span>
                <span>{fnLine.slice(relEnd)}</span>
              </span>
            ) : fnLine}
          </div>
        );
      })}
      <style jsx>{`
        pre {
          margin: 0;
          padding: 0;
          font-family: 'FiraCode-Light', monospace;
        }
      `}</style>
    </pre>
  );
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
};

SourceCode.contextTypes = {
  layout: React.PropTypes.object,
};
