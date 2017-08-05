import PropTypes from 'prop-types';
/* eslint-env browser */

import React from 'react';

// TODO: Make this an official React Cosmos proxy
export default ({
  getCss,
}) => {
  class GlobalCSSProxy extends React.Component {
    componentDidMount() {
      const css = getCss(this.props);
      if (css) {
        const node = document.createElement('style');
        node.appendChild(document.createTextNode(css));
        document.head.appendChild(node);
        this.globalStyleNode = node;
      }
    }

    componentWillUnmount() {
      if (this.globalStyleNode) {
        document.head.removeChild(this.globalStyleNode);
      }
    }

    render() {
      const {
        nextProxy,
      } = this.props;

      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next(),
      });
    }
  }

  GlobalCSSProxy.propTypes = {
    nextProxy: PropTypes.shape({
      value: PropTypes.func,
      next: PropTypes.func,
    }).isRequired,
  };

  return GlobalCSSProxy;
};
