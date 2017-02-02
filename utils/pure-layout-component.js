import React from 'react';
import shallowCompare from 'react-addons-shallow-compare';

class PureLayoutComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState, nextContext) {
    return shallowCompare(this, nextProps, nextState) || nextContext.layout !== this.context.layout;
  }
}

export default PureLayoutComponent;
