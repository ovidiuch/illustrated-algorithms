import React from 'react';
import PureLayoutComponent from '../../../utils/pure-layout-component';

class Outro extends PureLayoutComponent {
  render() {
    const {
      opacity,
      titleFontSize,
      titleLineHeight,
      titleTop,
      subtextFontSize,
      subtextTop,
    } = this.props.frame.outro;

    return (
      <div
        className="outro"
        style={{
          opacity,
        }}
        >
        <h1
          className="title"
          style={{
            top: titleTop,
            fontSize: titleFontSize,
            lineHeight: `${titleLineHeight}px`,
          }}
          >Sorted by name – <em>phew!</em></h1>
        <p
          className="subtext"
          style={{
            top: subtextTop,
            fontSize: subtextFontSize,
          }}
          >rewind & scroll for close examination</p>
        <style jsx>{`
          .title,
          .subtext {
            position: absolute;
            width: 100%;
            margin: 0;
            font-weight: 300;
            text-align: center;
            user-select: none;
            cursor: default;
          }
          .subtext {
            line-height: 1.2em;
            opacity: 0.5;
          }
        `}</style>
      </div>
    );
  }
}

Outro.propTypes = {
  frame: React.PropTypes.object.isRequired,
};

Outro.contextTypes = {
  layout: React.PropTypes.object,
};

export default Outro;
