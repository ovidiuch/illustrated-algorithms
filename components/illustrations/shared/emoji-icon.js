import Bear from 'emojione/assets/svg/1f43b.svg';
import Cat from 'emojione/assets/svg/1f431.svg';
import Dog from 'emojione/assets/svg/1f436.svg';
// import Gorilla from 'emojione/assets/svg/1f98d.svg';
import Lion from 'emojione/assets/svg/1f981.svg';
import Panda from 'emojione/assets/svg/1f43c.svg';
// import Pig from 'emojione/assets/svg/1f437.svg';
// import Rat from 'emojione/assets/svg/1f400.svg';
import Snail from 'emojione/assets/svg/1f40c.svg';
import React from 'react';

const emojis = {
  bear: Bear,
  cat: Cat,
  dog: Dog,
  // gorilla: Gorilla,
  lion: Lion,
  panda: Panda,
  // pig: Pig,
  // rat: Rat,
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
