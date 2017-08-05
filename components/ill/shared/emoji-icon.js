import Bear from 'emojione/assets/svg/1f43b.svg';
import Cat from 'emojione/assets/svg/1f431.svg';
import Dog from 'emojione/assets/svg/1f436.svg';
import Lion from 'emojione/assets/svg/1f981.svg';
import Panda from 'emojione/assets/svg/1f43c.svg';
import Snail from 'emojione/assets/svg/1f40c.svg';
import Cherries from 'emojione/assets/svg/1f352.svg';
import Kiwi from 'emojione/assets/svg/1f95d.svg';
import Grapes from 'emojione/assets/svg/1f347.svg';
import Avocado from 'emojione/assets/svg/1f951.svg';
import Peach from 'emojione/assets/svg/1f351.svg';
import Pineapple from 'emojione/assets/svg/1f34d.svg';
import NoEntry from 'emojione/assets/svg/1f6ab.svg';
import PropTypes from 'prop-types';
import React from 'react';

const emojis = {
  bear: Bear,
  cat: Cat,
  dog: Dog,
  lion: Lion,
  panda: Panda,
  snail: Snail,

  cherries: Cherries,
  kiwi: Kiwi,
  grapes: Grapes,
  avocado: Avocado,
  peach: Peach,
  pineapple: Pineapple,
  'no entry': NoEntry,
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
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};
