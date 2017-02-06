import React from 'react';
import quicksort from '../../algorithms/quicksort';
import QuicksortLayout from '../../layout/quicksort';
import PureLayoutComponent from '../../utils/pure-layout-component';

import EmojiBlock from './shared/emoji-block';

const BASE_ROTATIONS = [0.5, 1, -0.9, 1.4, -0.4, -1.35];

class Quicksort extends PureLayoutComponent {
  render() {
    const {
      nextStep
    } = this.props;
    const {
      list
    } = nextStep.bindings;
    const {
      layout
    } = this.context;
    const {
      innerWidth,
      illustrationHeight,
      padding,
      blockHeight,
    } = layout;

    return (
      <div
        className="quicksort"
        style={{
          width: innerWidth,
          height: illustrationHeight,
        }}
        >
        {list.map((name, index) => {
          const rotation = BASE_ROTATIONS[index];

          return (
            <div
              className="item"
              key={name}
              style={{
                top: blockHeight + (padding * 2),
                left: layout.getListItemLeftPosition(index, list.length),
                transform: `rotate(${rotation}deg)`,
              }}
              >
              <EmojiBlock
                name={name}
                />
            </div>
          );
        })}
        <style jsx>{`
          .quicksort {
            position: relative;
            margin: 0 auto;
          }
          .item {
            position: absolute;
          }
        `}</style>
      </div>
    );
  }
}

Quicksort.contextTypes = {
  layout: React.PropTypes.object,
};

Quicksort.Layout = QuicksortLayout;

Quicksort.algorithm = quicksort;

Quicksort.initialData = {
  list: [
    'cherries', 'kiwi', 'grapes', 'avocado', 'peach', 'pineapple'
  ]
};

export default Quicksort;
