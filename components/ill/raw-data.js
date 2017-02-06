import React from 'react';
import Link from 'next/link';
import RawDataLayout from '../../layout/raw-data';

class RawData extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    // This component doesn't do any animation and only prints the next step
    return nextProps.nextStep !== this.props.nextStep || nextContext.layout !== this.context.layout;
  }

  render() {
    const {
      prevStep,
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
    const isFirstStep = prevStep.intro;

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
          {isFirstStep ? (
            <div
              className="wip"
              style={{
                fontSize,
                padding,
                marginBottom: padding,
              }}
              >
              <p>Work in progress: No visualisation. Context displayed as JSON.</p>
              <p>
                <Link href="/binary-search"><a>See binary search</a></Link> for a complete example.{' '}
                <a href="https://github.com/skidding/illustrated-algorithms#work-in-progress">Stay tuned for updates.</a>
              </p>
            </div>
          ) : null}
          {Object.keys(bindings).filter(key => bindings[key] !== undefined).map(key =>
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
          .wip {
            background: rgba(255, 255, 255, 0.4);
          }
          .wip p {
            margin: 0;
            margin-bottom: 1em;
          }
          .wip p:last-child {
            margin-bottom: 0;
          }
          .wip a {
            color: black;
            white-space: nowrap;
          }
        `}</style>
      </div>
    );
  }
}

RawData.propTypes = {
  prevStep: React.PropTypes.object.isRequired,
  nextStep: React.PropTypes.object.isRequired,
};

RawData.contextTypes = {
  layout: React.PropTypes.object,
};

RawData.Layout = RawDataLayout;

export default RawData;
