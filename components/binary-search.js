/* eslint-disable new-cap */

import React from 'react';
import {
  getBubbleSize,
} from '../utils/binary-search';
import EmojiBubble from './emoji-bubble';
import Value from './value';
import NumberVar from './number-var';

const onlyDefined = items => items.filter(i => i !== undefined);
const ofSameValue = (val, others) => others.filter(i => i === val).length;

function List({ step }) {
  const { context } = step;
  const {
    list,
    low,
    high,
  } = context;

  return (
    <div
      className="list"
      style={{
        top: getBubbleSize(0.7),
      }}
      >
      {list.map((name, index) => {
        const isIncluded = (
          (low === undefined || high === undefined) ||
          (index >= low && index <= high)
        );

        return (
          <div
            key={name}
            className="item"
            style={{
              left: getBubbleSize(index),
              opacity: isIncluded ? 1 : 0.4,
            }}
            >
            <EmojiBubble name={name}/>
          </div>
        );
      })}
      <style jsx>{`
        .list {
          position: absolute;
          left: 0;
        }
        .item {
          position: absolute;
          top: 0;
        }
      `}</style>
    </div>
  );
}

function Low({ step }) {
  const { context } = step;
  const {
    low,
    mid,
    high,
  } = context;

  if (low === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: getBubbleSize(0.25),
    1: 0,
    2: -getBubbleSize(0.25),
  };
  const occupyingSamePos = ofSameValue(low, onlyDefined([mid, high]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(low) + offset }}>
      <NumberVar
        value={low}
        label="low"
        />
    </div>
  );
}

function High({ step }) {
  const { context } = step;
  const {
    low,
    mid,
    high,
  } = context;

  if (high === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: getBubbleSize(0.25),
    1: getBubbleSize(0.5),
    2: getBubbleSize(0.75),
  };
  const occupyingSamePos = ofSameValue(high, onlyDefined([low, mid]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(high) + offset }}>
      <NumberVar
        value={high}
        label="high"
        />
    </div>
  );
}

function Mid({ step }) {
  const { context } = step;
  const {
    low,
    mid,
    high,
  } = context;

  if (mid === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: () => getBubbleSize(0.25),
    1: () => low === undefined ? getBubbleSize(0.5) : 0,
    2: () => getBubbleSize(0.25),
  };
  const occupyingSamePos = ofSameValue(mid, onlyDefined([low, high]));
  const offset = offsetAlongSiblings[occupyingSamePos]();

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(mid) + offset }}>
      <NumberVar
        value={mid}
        label="mid"
        inverted
        />
    </div>
  );
}

function Guess({ step }) {
  const { context } = step;
  const {
    list,
    item,
    mid,
    guess,
  } = context;

  const left =
    guess ?
    getBubbleSize(mid) :
    getBubbleSize((list.length / 2) - 0.5);

  return (
    <div
      style={{
        position: 'absolute',
        top: getBubbleSize(0.7 + 1.25 + 0.6),
        left,
      }}
      >
      <EmojiBubble name={item}/>
    </div>
  );
}

function Comparison({ step }) {
  const { context, compared, returnValue } = step;
  const {
    item,
    mid,
    guess,
  } = context;

  if (!guess || (!compared && returnValue === undefined)) {
    return null;
  }

  const val = returnValue === undefined ? (
    guess === item ? '=' : (
      guess > item ? '>' : '<'
    )
  ) : '=';

  return (
    <div
      style={{
        position: 'absolute',
        top: getBubbleSize(0.7 + 1.25 + 0.2),
        left: getBubbleSize(mid + 0.3),
      }}
      >
      <Value value={val}/>
    </div>
  );
}

export default function BinarySearch(props) {
  const {
    list,
  } = props.step.context;

  return (
    <div className="binary-search" style={{ width: getBubbleSize(list.length) }}>
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

/* eslint-disable react/no-unused-prop-types */
List.propTypes =
Low.propTypes =
Mid.propTypes =
High.propTypes =
Guess.propTypes =
Comparison.propTypes =
BinarySearch.propTypes = {
  step: React.PropTypes.object.isRequired,
};
