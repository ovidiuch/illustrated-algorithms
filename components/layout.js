/* global window */

import React from 'react';
import Head from 'next/head';
import Menu from '../components/menu';

const getWindowSize = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      renderedOnClient: false,
      // iPhone 6 portrait resolution
      width: 375,
      height: 667,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.setState({
      renderedOnClient: true,
      ...getWindowSize(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState(getWindowSize());
  }

  getChildContext() {
    const {
      LayoutCalc,
      code,
    } = this.props;
    const { width, height } = this.state;

    return {
      layout: new LayoutCalc({
        width,
        height,
        code,
      }),
    };
  }

  render() {
    const {
      children,
      color,
      pathname,
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
        <div className="content" style={{ opacity: renderedOnClient ? 1 : 0 }}>
          <Menu pathname={pathname}/>
          {children}
          <style jsx>{`
            .content {
              transition: opacity 0.5s;
            }
          `}</style>
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  color: React.PropTypes.string.isRequired,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]).isRequired,
  pathname: React.PropTypes.string.isRequired,
  code: React.PropTypes.string.isRequired,
  LayoutCalc: React.PropTypes.func.isRequired,
};

Layout.childContextTypes = {
  layout: React.PropTypes.object,
};

export default Layout;
