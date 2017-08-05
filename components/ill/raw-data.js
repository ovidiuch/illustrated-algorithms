import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';
import PureLayoutComponent from '../../utils/pure-layout-component';

class RawData extends PureLayoutComponent {
  render() {
    const {
      frame,
    } = this.props;
    const {
      layout
    } = this.context;
    const {
      bindings,
      returnValue,
      isFirstStep,
    } = frame;
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
                See <Link href="/binary-search"><a>binary search</a></Link> or <Link href="/quicksort"><a>quicksort</a></Link> for complete examples.{' '}
                <a href="https://github.com/skidding/illustrated-algorithms#work-in-progress">Stay tuned for updates.</a>
              </p>
            </div>
          ) : null}
          {Object.keys(bindings).filter(key => bindings[key] !== undefined).map(key =>
            (
              <pre
                key={key}
                style={{ padding }}
              >
                {key} = {JSON.stringify(bindings[key])}
              </pre>
            )
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
        `}
        </style>
      </div>
    );
  }
}

RawData.propTypes = {
  frame: PropTypes.object.isRequired,
};

RawData.contextTypes = {
  layout: PropTypes.object,
};

export default RawData;
