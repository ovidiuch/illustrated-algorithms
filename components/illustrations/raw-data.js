import React from 'react';
import RawDataLayout from '../../layout/raw-data';

class RawData extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // This component doesn't do any animation and only prints the next step
    return nextProps.nextStep !== this.props.nextStep || nextContext.layout !== this.context.layout;
  }

  render() {
    const {
      nextStep,
    } = this.props;
    const {
      layout
    } = this.context;
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
            text-align: left;
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
            white-space: pre-wrap;
          }
          .return-value {
            background: rgba(0, 0, 0, 0.8);
          }
        `}</style>
      </div>
    );
  }
}

RawData.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
};

RawData.contextTypes = {
  layout: React.PropTypes.object,
};

RawData.Layout = RawDataLayout;

export default RawData;
