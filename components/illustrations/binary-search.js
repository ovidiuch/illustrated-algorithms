/* eslint-disable new-cap */

import React from 'react';
import EmojiBubble from '../emoji-bubble';
import Value from '../value';
import NumberVar from '../number-var';

const onlyDefined = items => items.filter(i => i !== undefined);

const ofSameValue = (val, others) => others.filter(i => i === val).length;

const getBubbleSize = (sideWidth, c = 1) => c * (sideWidth - 20) / 6;

function List({ step }, { layout }) {
  const { bindings } = step;
  const {
    list,
    low,
    high,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  return (
    <div
      className="list"
      style={{
        top: getBubbleSize(sideWidth, 0.7),
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
              left: getBubbleSize(sideWidth, index),
              opacity: isIncluded ? 1 : 0.4,
            }}
            >
            <EmojiBubble name={name} width={getBubbleSize(sideWidth)}/>
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

function Low({ step }, { layout }) {
  const { bindings } = step;
  const {
    low,
    mid,
    high,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  if (low === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: getBubbleSize(sideWidth, 0.25),
    1: 0,
    2: -getBubbleSize(sideWidth, 0.25),
  };
  const occupyingSamePos = ofSameValue(low, onlyDefined([mid, high]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(sideWidth, low) + offset }}>
      <NumberVar
        value={low}
        label="low"
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

function High({ step }, { layout }) {
  const { bindings } = step;
  const {
    low,
    mid,
    high,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  if (high === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: getBubbleSize(sideWidth, 0.25),
    1: getBubbleSize(sideWidth, 0.5),
    2: getBubbleSize(sideWidth, 0.75),
  };
  const occupyingSamePos = ofSameValue(high, onlyDefined([low, mid]));
  const offset = offsetAlongSiblings[occupyingSamePos];

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(sideWidth, high) + offset }}>
      <NumberVar
        value={high}
        label="high"
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

function Mid({ step }, { layout }) {
  const { bindings } = step;
  const {
    low,
    mid,
    high,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  if (mid === undefined) {
    return null;
  }

  const offsetAlongSiblings = {
    0: () => getBubbleSize(sideWidth, 0.25),
    1: () => low === undefined ? getBubbleSize(sideWidth, 0.5) : 0,
    2: () => getBubbleSize(sideWidth, 0.25),
  };
  const occupyingSamePos = ofSameValue(mid, onlyDefined([low, high]));
  const offset = offsetAlongSiblings[occupyingSamePos]();

  return (
    <div style={{ position: 'absolute', left: getBubbleSize(sideWidth, mid) + offset }}>
      <NumberVar
        value={mid}
        label="mid"
        inverted
        width={getBubbleSize(sideWidth, 0.5)}
        />
    </div>
  );
}

function Guess({ step }, { layout }) {
  const { bindings } = step;
  const {
    list,
    item,
    mid,
    guess,
  } = bindings;
  const {
    sideWidth,
  } = layout;

  const left =
    guess ?
    getBubbleSize(sideWidth, mid) :
    getBubbleSize(sideWidth, (list.length / 2) - 0.5);

  return (
    <div
      style={{
        position: 'absolute',
        top: getBubbleSize(sideWidth, 0.7 + 1.25 + 0.6),
        left,
      }}
      >
      <EmojiBubble name={item} width={getBubbleSize(sideWidth)}/>
    </div>
  );
}

function Comparison({ step }, { layout }) {
  const { bindings, compared, returnValue } = step;
  const {
    item,
    mid,
    guess,
  } = bindings;
  const {
    sideWidth,
  } = layout;

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
        top: getBubbleSize(sideWidth, 0.7 + 1.25 + 0.2),
        left: getBubbleSize(sideWidth, mid + 0.3),
      }}
      >
      <Value
        value={val}
        width={getBubbleSize(sideWidth, 0.4)}
        />
    </div>
  );
}

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

List.contextTypes =
Low.contextTypes =
Mid.contextTypes =
High.contextTypes =
Guess.contextTypes =
Comparison.contextTypes =
BinarySearch.contextTypes = {
  layout: React.PropTypes.object,
};
