import React from 'react';
import binarySearch from '../../../algorithms/binary-search';
import BinarySearchLayout from '../../../layout/binary-search';
import PureLayoutComponent from '../../pure-layout-component';
import List from './list';
import Item from './item';
import Low from './low';
import High from './high';
import Mid from './mid';
import Comparison from './comparison';
import Intro from './intro';

class BinarySearch extends PureLayoutComponent {
  constructor(props) {
    super(props);

    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(name) {
    const { steps } = binarySearch(BinarySearch.initialData.list, name);
    this.props.onGenerateSteps(steps);
  }

  render() {
    const { props } = this;
    const {
      innerWidth,
      illustrationHeight,
    } = this.context.layout;

    return (
      <div
        className="binary-search"
        style={{
          width: innerWidth,
          height: illustrationHeight,
        }}
        >
        <Intro {...props}/>
        <Item {...props}/>
        <Low {...props}/>
        <High {...props}/>
        <Mid {...props}/>
        <List
          {...props}
          onSelect={this.handleSelect}
          />
        <Comparison {...props}/>
        <style jsx>{`
          .binary-search {
            position: relative;
            margin: 0 auto;
          }
        `}</style>
      </div>
    );
  }
}

BinarySearch.propTypes = {
  onGenerateSteps: React.PropTypes.func.isRequired,
};

BinarySearch.contextTypes = {
  layout: React.PropTypes.object,
};

BinarySearch.Layout = BinarySearchLayout;

BinarySearch.initialData = {
  list: [
    'bear', 'cat', 'dog', 'lion', 'panda', 'snail'
  ]
};

export default BinarySearch;
