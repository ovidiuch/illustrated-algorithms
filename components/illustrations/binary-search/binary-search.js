import React from 'react';
import List from './list';
import Item from './item';
import Low from './low';
import High from './high';
import Mid from './mid';
import Comparison from './comparison';

export default function BinarySearch(props, { layout }) {
  const {
    innerWidth,
    height,
    margin
  } = layout;
  return (
    <div
      className="binary-search"
      style={{
        width: innerWidth,
        height,
        marginLeft: margin,
      }}
      >
      <Item {...props}/>
      <Low {...props}/>
      <High {...props}/>
      <Mid {...props}/>
      <List {...props}/>
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
