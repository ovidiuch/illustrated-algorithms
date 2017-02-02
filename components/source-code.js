import React from 'react';
import PureLayoutComponent from '../utils/pure-layout-component';

const { min, max } = Math;

const renderLineNum = num => (
  <span className="line-num">
    {num < 10 && ' '}{`${num}. `}
    <style jsx>{`
      .line-num {
        opacity: 0.3;
      }
    `}</style>
  </span>
);

const renderLine = (fnLine, lineStart, highlight, num) => {
  if (highlight) {
    const { start, end } = highlight;
    const lineLen = fnLine.length;
    const lineEnd = lineStart + lineLen;
    const isRangeInLine = start < lineEnd && end > lineStart;

    if (isRangeInLine) {
      const relStart = max(0, start - lineStart);
      const relEnd = min(end - lineStart, lineLen);

      return (
        <div key={num} className="selected-line">
          {renderLineNum(num)}
          <span>
            <span>{fnLine.slice(0, relStart)}</span>
            <span className="highlight">
              {fnLine.slice(relStart, relEnd)}
            </span>
            <span>{fnLine.slice(relEnd)}</span>
          </span>
          <style jsx>{`
            .selected-line {
              background: rgba(255, 255, 255, 0.4);
            }
            .highlight {
              display: inline-block;
              background: rgba(255, 255, 255, 0.8);
            }
          `}</style>
        </div>
      );
    }
  }

  return (
    <div key={num}>
      {renderLineNum(num)}
      {fnLine}
    </div>
  );
};

class SourceCode extends PureLayoutComponent {
  render() {
    const {
      def,
      highlight,
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
        {def.split('\n').map((fnLine, num) => {
          const lineEl = renderLine(fnLine, lineStart, highlight, num);
          lineStart += fnLine.length + 1; // account for newlines removed

          return lineEl;
        })}
        <style jsx>{`
          pre {
            display: inline-block;
            margin: 0;
            padding: 0;
            text-align: left;
          }
        `}</style>
      </pre>
    );
  }
}

SourceCode.propTypes = {
  def: React.PropTypes.string.isRequired,
  highlight: React.PropTypes.shape({
    start: React.PropTypes.number.isRequired,
    end: React.PropTypes.number.isRequired,
  }),
};

SourceCode.contextTypes = {
  layout: React.PropTypes.object,
};

export default SourceCode;
