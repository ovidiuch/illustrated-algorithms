import PropTypes from 'prop-types';
/* global window, document */

import React from 'react';
import Head from 'next/head';
import debounce from 'lodash.debounce';
import getAlgoName from '../utils/names';
import Menu from './menu';
import Player from './player';

const getWindowSize = () => ({
  width: document.body.clientWidth || window.innerWidth, // Fallback for jsdom
  height: window.innerHeight,
});

const createLayout = (props, state) => {
  const {
    algorithm,
    computeLayout,
  } = props;
  const { width, height } = state;

  return computeLayout({
    width,
    height,
    code: algorithm.code,
  });
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = debounce(this.handleResize.bind(this), 300);

    this.state = {
      renderedOnClient: false,
      // IPhone 6 portrait resolution
      width: 375,
      height: 667,
    };

    this.layout = createLayout(props, this.state);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.setState({
      renderedOnClient: true,
      ...getWindowSize(),
    });
  }

  componentWillUpdate(nextProps, nextState) {
    this.layout = createLayout(nextProps, nextState);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState(getWindowSize());
  }

  getChildContext() {
    return {
      layout: this.layout,
    };
  }

  render() {
    const {
      currentPath,
      algorithm,
      illustration,
      computeFrame,
      steps,
      actions,
    } = this.props;
    const {
      renderedOnClient,
    } = this.state;
    const {
      color,
    } = this.layout;

    return (
      <div>
        <Head>
          <title>{`Illustrated ${getAlgoName(currentPath)} algorithm`}</title>
          <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <style>{`
            body {
              margin: 0;
              padding: 0;
              transition: background 0.5s;
              font-family: 'Helvetica Neue', Helvetica, sans-serif;
            }
            @font-face {
              font-family: 'FiraCode-Light';
              src: url('/static/FiraCode-Light.woff');
            }
            pre,
            .code {
              font-family: 'FiraCode-Light', monospace;
            }
          `}
          </style>
          <style>{`
            body {
              background: ${color};
            }
          `}
          </style>
        </Head>
        <div className="body" style={{ opacity: renderedOnClient ? 1 : 0 }}>
          <div className="header">
            <Menu currentPath={currentPath}/>
          </div>
          <div className="content">
            <Player
              algorithm={algorithm}
              illustration={illustration}
              computeFrame={computeFrame}
              steps={steps}
              actions={actions}
            />
          </div>
          <style jsx>{`
            .body {
              transition: opacity 0.5s;
            }
            .header {
              position: absolute;
              z-index: 2;
              width: 100%;
            }
            .content {
              position: absolute;
              z-index: 1;
            }
          `}
          </style>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  currentPath: PropTypes.string.isRequired,
  algorithm: PropTypes.func.isRequired,
  illustration: PropTypes.func.isRequired,
  // ESLint plugin bug
  // eslint-disable-next-line react/no-unused-prop-types
  computeLayout: PropTypes.func.isRequired,
  computeFrame: PropTypes.func.isRequired,
  steps: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

Page.childContextTypes = {
  layout: PropTypes.object,
};

export default Page;
