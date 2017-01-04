import React from 'react';

export default function SourceCode({
  def,
  start,
  end,
}) {
  let lineStart = 0;
  return (
    <pre>
      {def.split('\n').map((fnLine, i) => {
        const lineLen = fnLine.length;
        const lineEnd = lineStart + lineLen;
        const isRangeInLine = start < lineEnd && end > lineStart;
        const relStart = start - lineStart;
        const relEnd = end - lineStart;
        lineStart += lineLen + 1; // account for newlines removed

        return (
          <div
            key={i}
            style={{ backgroundColor: isRangeInLine ? 'rgba(255, 255, 255, 0.4)' : 'transparent' }}
            >
            <span style={{ opacity: 0.5 }}>{`${i}. `}</span>
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
    </pre>
  );
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
};
