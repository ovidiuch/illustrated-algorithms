import PropTypes from 'prop-types';
import React from 'react';
import PureLayoutComponent from '../../../utils/pure-layout-component';
import EmojiBlock from '../shared/emoji-block';
import Label from '../shared/label';
import Intro from '../quicksort/intro';
import Outro from '../quicksort/outro';

const BASE_ROTATIONS = {
  cherries: 0.5,
  kiwi: 1.4,
  grapes: -2.9,
  avocado: 1.9,
  peach: -0.8,
  pineapple: -2.35
};

class Quicksort extends PureLayoutComponent {
  constructor(props) {
    super(props);

    this.handleShuffle = this.handleShuffle.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleShuffle() {
    this.props.actions.shuffleInput();
  }

  handleStart() {
    this.props.actions.generateSteps(() => {
      this.props.actions.play();
    });
  }

  render() {
    const {
      frame,
    } = this.props;
    const {
      layout
    } = this.context;
    const {
      innerWidth,
      labelTopPosition,
      illustrationHeight,
      itemGroupTopPosition,
      listCenterTopPosition,
    } = layout;
    const {
      pivot,
      less,
      greater,
      lessEmpty,
      greaterEmpty,
      listEmptyOpacity,
      itemPositions,
      bindings,
    } = frame;
    const {
      list,
    } = bindings;

    return (
      <div
        className="quicksort"
        style={{
          width: innerWidth,
          height: illustrationHeight,
        }}
      >
        <div
          className="pivot"
          style={{
            opacity: pivot.opacity,
            transform: `
              translate(${pivot.left}px, ${labelTopPosition}px)
              scale(${pivot.scale})
            `,
          }}
        >
          <Label text="pivot"/>
        </div>
        <div
          className="less"
          style={{
            opacity: less.opacity,
            transform: `
              translate(${less.left}px, ${labelTopPosition}px)
              scale(${less.scale})
            `,
          }}
        >
          <Label text="less"/>
        </div>
        <div
          className="greater"
          style={{
            opacity: greater.opacity,
            transform: `
              translate(${greater.left}px, ${labelTopPosition}px)
              scale(${greater.scale})
            `,
          }}
        >
          <Label text="greater"/>
        </div>
        <div
          className="less-empty"
          style={{
            opacity: lessEmpty.opacity,
            transform: `
              translate(${less.left}px, ${itemGroupTopPosition}px)
              rotate(2.5deg)
              scale(${less.scale})
            `,
          }}
        >
          <EmojiBlock
            glow={lessEmpty.glow}
          />
        </div>
        <div
          className="greater-empty"
          style={{
            opacity: greaterEmpty.opacity,
            transform: `
              translate(${greater.left}px, ${itemGroupTopPosition}px)
              rotate(-1.9deg)
              scale(${greater.scale})
            `,
          }}
        >
          <EmojiBlock
            glow={greaterEmpty.glow}
          />
        </div>
        <div
          className="list-empty"
          style={{
            opacity: listEmptyOpacity,
            transform: `
              translate(${pivot.left}px, ${listCenterTopPosition}px)
              rotate(0.5deg)
            `,
          }}
        >
          <EmojiBlock
            glow={0}
          />
        </div>
        <div>
          {list.map(name => {
            const {
              left,
              top,
              rotation,
              index,
              glow
            } = itemPositions[name];
            const baseRotation = BASE_ROTATIONS[name];
            const relRotation = baseRotation + rotation;

            return (
              <div
                key={name}
                className="item"
                style={{
                  zIndex: index,
                  transform: `
                    translate(${left}px, ${top}px)
                    rotate(${relRotation}deg)
                  `,
                }}
              >
                <EmojiBlock
                  name={name}
                  glow={glow}
                />
              </div>
            );
          })}
          <Intro
            frame={frame}
            onShuffle={this.handleShuffle}
            onStart={this.handleStart}
          />
          <Outro
            frame={frame}
          />
        </div>
        <style jsx>{`
          .quicksort {
            position: relative;
            margin: 0 auto;
          }
          .pivot,
          .less,
          .greater,
          .less-empty,
          .greater-empty,
          .list-empty,
          .item {
            position: absolute;
            will-change: transform, opacity;
          }
        `}
        </style>
      </div>
    );
  }
}

Quicksort.propTypes = {
  actions: PropTypes.object.isRequired,
};

Quicksort.contextTypes = {
  layout: PropTypes.object,
};

export default Quicksort;
