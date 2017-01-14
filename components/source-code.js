import React from 'react';
import PureLayoutComponent from './pure-layout-component';

const { min, max } = Math;

class SourceCode extends PureLayoutComponent {
  render() {
    const {
      def,
      start,
      end,
    } = this.props;
    const {
      layout,
    } = this.context;
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
              className={isRangeInLine && 'selected-line'}
              >
              <span className="line-num">
                {i < 10 && ' '}{`${i}. `}
              </span>
              {isRangeInLine ? (
                <span>
                  <span>{fnLine.slice(0, relStart)}</span>
                  <span className="highlight">
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
          .selected-line {
            background: rgba(255, 255, 255, 0.4);
          }
          .highlight {
            background: rgba(255, 255, 255, 0.8);
          }
          .line-num {
            opacity: 0.3;
          }
        `}</style>
      </pre>
    );
  }
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  start: React.PropTypes.number.isRequired,
  end: React.PropTypes.number.isRequired,
};

SourceCode.contextTypes = {
  layout: React.PropTypes.object,
};

export default SourceCode;
