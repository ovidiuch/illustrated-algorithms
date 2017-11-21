import PropTypes from 'prop-types';
import React from 'react';
import classNames from 'classnames';
import PureLayoutComponent from '../../../utils/pure-layout-component';
import EmojiBlock from '../shared/emoji-block';

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
  name: PropTypes.string.isRequired,
  glow: PropTypes.number.isRequired,
  isSelectable: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

ListItem.contextTypes = {
  layout: PropTypes.object,
};

class List extends PureLayoutComponent {
  render() {
    const {
      frame,
      onSelect,
    } = this.props;
    const {
      items,
      isSelectable,
    } = frame.list;
    const { layout } = this.context;
    const {
      listTop,
    } = layout;
    return (
      <div
        className="list"
        style={{
          top: listTop,
        }}
      >
        {items.map(({
          name,
          isGuess,
          left,
          opacity,
          rotation,
          glow,
        }) => {
          return (
            <div
              key={name}
              className={classNames({
                item: true,
                'item-selectable': isSelectable,
              })}
              style={{
                opacity,
                transform: `
                  translate(${left}px, 0px)
                  rotate(${rotation}deg)
                `,
                zIndex: isGuess ? 1 : 0,
              }}
            >
              <ListItem
                name={name}
                glow={glow}
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
            will-change: opacity, transform;
          }
          .item-selectable {
            cursor: pointer;
          }
        `}
        </style>
      </div>
    );
  }
}

List.propTypes = {
  frame: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
};

List.contextTypes = {
  layout: PropTypes.object,
};

export default List;
