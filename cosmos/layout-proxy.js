import React from 'react';

class LayoutProxy extends React.Component {
  render() {
    const {
      nextProxy,
      fixture,
    } = this.props;
    const { _layoutFor } = fixture;

    if (!_layoutFor) {
      return React.createElement(nextProxy.value, {
        ...this.props,
        nextProxy: nextProxy.next(),
      });
    }

    const layout = new _layoutFor.Layout({
      width: 1200,
      height: 600,
      code: _layoutFor.algorithm.code,
    });

    return React.createElement(nextProxy.value, {
      ...this.props,
      nextProxy: nextProxy.next(),
      fixture: {
        ...fixture,
        context: {
          layout,
        },
      },
      // Let other proxies make use of the layout instance as well
      layout,
    });
  }
}

LayoutProxy.propTypes = {
  nextProxy: React.PropTypes.shape({
    value: React.PropTypes.func,
    next: React.PropTypes.func,
  }).isRequired,
  fixture: React.PropTypes.object.isRequired,
};

export default () => LayoutProxy;
