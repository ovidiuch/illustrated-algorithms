import React from 'react';
import Bear from 'emojione/assets/svg/1f43b.svg';
import Cat from 'emojione/assets/svg/1f431.svg';
import Dog from 'emojione/assets/svg/1f436.svg';
import Pig from 'emojione/assets/svg/1f437.svg';
import Rat from 'emojione/assets/svg/1f400.svg';
import Lion from 'emojione/assets/svg/1f981.svg';
import Snail from 'emojione/assets/svg/1f40c.svg';

const emojis = {
  bear: Bear,
  cat: Cat,
  dog: Dog,
  pig: Pig,
  rat: Rat,
  lion: Lion,
  snail: Snail,
};

export default class EmojiIcon extends React.PureComponent {
  render() {
    const { name, width, height } = this.props;
    return (
      <div>
        {emojis[name] ? React.createElement(emojis[name], { width, height }) : null}
      </div>
    );
  }
}

EmojiIcon.propTypes = {
  name: React.PropTypes.string.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
};
