import React from 'react';
import {
  getBubbleSize
} from '../../../utils/binary-search';
import List from './list';
import Low from './low';
import High from './high';
import Mid from './mid';
import Guess from './guess';
import Comparison from './comparison';

export default function BinarySearch(props, { layout }) {
  const {
    sideWidth,
  } = layout;

  return (
    <div
      className="binary-search"
      style={{
        width: sideWidth,
        height: getBubbleSize(sideWidth, 0.7 + 1.25 + 0.6 + 1.25),
      }}
      >
      <Low {...props}/>
      <High {...props}/>
      <Mid {...props}/>
      <List {...props}/>
      <Guess {...props}/>
      <Comparison {...props}/>
      <style jsx>{`
        .binary-search {
          position: relative;
        }
      `}</style>
    </div>
  );
}

BinarySearch.propTypes = {
  nextStep: React.PropTypes.object.isRequired,
  prevStep: React.PropTypes.object,
  stepProgress: React.PropTypes.number.isRequired,
};

BinarySearch.contextTypes = {
  layout: React.PropTypes.object,
};
