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

    return (
      <div
        className="cosmos-layout-proxy"
        style={{
          backgroundColor: layout.color,
        }}
        >
        {React.createElement(nextProxy.value, { ...this.props,
          nextProxy: nextProxy.next(),
          fixture: {
            ...fixture,
            context: {
              layout,
            },
          }
        })}
        <style jsx global>{`
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, sans-serif;
          }
          @font-face {
            font-family: 'FiraCode-Light';
            src: url('/loader/FiraCode-Light.woff');
          }
          pre,
          .code {
            font-family: 'FiraCode-Light';
          }
          .cosmos-layout-proxy {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
          }
        `}</style>
      </div>
    );
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
