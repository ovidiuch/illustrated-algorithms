import React from 'react';
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
        }, index) => {
          return (
            <div
              key={index}
              className={`item ${isSelectable && 'item-selectable'}`}
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
        `}</style>
      </div>
    );
  }
}

List.propTypes = {
  frame: React.PropTypes.object.isRequired,
  onSelect: React.PropTypes.func.isRequired,
};

List.contextTypes = {
  layout: React.PropTypes.object,
};

export default List;
