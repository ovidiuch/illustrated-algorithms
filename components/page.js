/* global window */

import React from 'react';
import Head from 'next/head';
import Menu from './menu';
import Player from './player';

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const createLayout = (props, state) => {
  const {
    illustration,
    code,
  } = props;
  const { width, height } = state;

  return new illustration.Layout({
    width,
    height,
    code,
  });
};

class Page extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      renderedOnClient: false,
      // iPhone 6 portrait resolution
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
      color,
      pathname,
      steps,
      code,
      illustration,
    } = this.props;
    const {
      renderedOnClient,
    } = this.state;

    return (
      <div>
        <Head>
          <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width"/>
          <meta name="apple-mobile-web-app-capable" content="yes"/>
          <style>{`
            body {
              margin: 0;
              padding: 0;
              background: ${color};
              transition: background 0.5s;
              font-family: 'Helvetica Neue', Helvetica, sans-serif;
            }
          `}</style>
        </Head>
        <div className="body" style={{ opacity: renderedOnClient ? 1 : 0 }}>
          <div className="header">
            <Menu pathname={pathname}/>
          </div>
          <div className="content">
            <Player
              steps={steps}
              code={code}
              illustration={illustration}
              color={color}
              />
          </div>
          <style jsx>{`
            .body {
              transition: opacity 0.5s;
            }
            .header {
              position: absolute;
              z-index: 2;
            }
            .content {
              position: absolute;
              z-index: 1;
            }
          `}</style>
        </div>
      </div>
    );
  }
}

Page.propTypes = {
  color: React.PropTypes.string.isRequired,
  pathname: React.PropTypes.string.isRequired,
  steps: React.PropTypes.array,
  code: React.PropTypes.string.isRequired,
  illustration: React.PropTypes.func.isRequired,
};

Page.childContextTypes = {
  layout: React.PropTypes.object,
};

export default Page;
