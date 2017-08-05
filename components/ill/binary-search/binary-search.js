import PropTypes from 'prop-types';
import React from 'react';
import PureLayoutComponent from '../../../utils/pure-layout-component';
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

  handleSelect(item) {
    this.props.actions.generateSteps(item, () => {
      this.props.actions.play();
    });
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
        `}
        </style>
      </div>
    );
  }
}

BinarySearch.propTypes = {
  actions: PropTypes.object.isRequired,
};

BinarySearch.contextTypes = {
  layout: PropTypes.object,
};

export default BinarySearch;
