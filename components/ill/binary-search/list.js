import React from 'react';
import PureLayoutComponent from '../../pure-layout-component';
import EmojiBlock from '../shared/emoji-block';
import {
  transitionValue,
} from '../../../utils/transition';
import getWobbleRotation from '../../../utils/wobble';

const getItemGlow = (name, step) =>
  step !== undefined && step.bindings.guess === name ? 0.4 : 0;

const getItemOpacity = (index, step) => {
  if (step === undefined) {
    return 1;
  }

  const {
    low,
    high,
  } = step.bindings;

  const isIncluded = (
    (low === undefined || high === undefined) ||
    (index >= low && index <= high)
  );

  return isIncluded ? 1 : 0.2;
};

const BASE_ROTATIONS = [-0.9, -0.4, 1.4, 0.5, -1.35, 1];

class ListItem extends PureLayoutComponent {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const {
      name,
      isSelectable,
      onSelect,
    } = this.props;

    if (isSelectable) {
      onSelect(name);
    }
  }

  render() {
    const {
      name,
      glow,
    } = this.props;

    return (
      <div onClick={this.handleClick}>
        <EmojiBlock
          name={name}
          glow={glow}
          />
      </div>
    );
  }
}

ListItem.propTypes = {
  name: React.PropTypes.string.isRequired,
  glow: React.PropTypes.number.isRequired,
  isSelectable: React.PropTypes.bool.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

ListItem.contextTypes = {
  layout: React.PropTypes.object,
};

class List extends PureLayoutComponent {
  render() {
    const {
      prevStep,
      nextStep,
      stepProgress,
      onSelect,
    } = this.props;
    const { layout } = this.context;
    const {
      bindings,
      compared,
    } = nextStep;
    const {
      list,
      mid,
    } = bindings;
    const isSelectable = Boolean(nextStep.intro && stepProgress === 0);
    const {
      listTopPosition,
    } = layout;

    return (
      <div
        className="list"
        style={{
          top: listTopPosition,
        }}
        >
        {list.map((name, index) => {
          const isGuess = compared && compared.indexOf('guess') !== -1 && index === mid;
          const rotation = BASE_ROTATIONS[index] + (isGuess ? getWobbleRotation(stepProgress) : 0);

          return (
            <div
              key={index}
              className={`item ${isSelectable && 'item-selectable'}`}
              style={{
                left: layout.getListItemLeftPosition(index),
                opacity: transitionValue(
                  getItemOpacity(index, prevStep),
                  getItemOpacity(index, nextStep),
                  stepProgress,
                ),
                transform: `rotate(${rotation}deg)`,
                zIndex: isGuess ? 1 : 0,
              }}
              >
              <ListItem
                name={name}
                glow={transitionValue(
                  getItemGlow(name, prevStep),
                  getItemGlow(name, nextStep),
                  stepProgress,
                )}
                isSelectable={isSelectable}
                onSelect={onSelect}
                />
            </div>
          );
        })}
        <style jsx>{`
          .list {
            position: absolute;
          }
          .item {
            position: absolute;
          }
          .item-selectable {
            cursor: pointer;
          }
        `}</style>
      </div>
    );
  }
}

List.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

List.contextTypes = {
  layout: React.PropTypes.object,
};

export default List;
