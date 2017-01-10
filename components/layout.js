/* global window */

import React from 'react';
import Head from 'next/head';
import Menu from '../components/menu';
import LayoutCalc from '../utils/layout/layout-calc';

const getWindowWidth = () => ({
  width: window.innerWidth,
  height: window.innerHeight,
});

const IPHONE6_LANDSCAPE_WIDTH = 667;
const HEADER_HEIGHT = 18;
const FOOTER_HEIGHT = 18;

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
      ...getWindowWidth(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState(getWindowWidth());
  }

  getChildContext() {
    const { LayoutCalc } = this.props;
    const { width, height } = this.state;

    const headerHeight = HEADER_HEIGHT;
    const footerHeight = FOOTER_HEIGHT;
    const minSides = IPHONE6_LANDSCAPE_WIDTH;
    const visibleHeight = height - headerHeight - footerHeight;

    return {
      layout: new LayoutCalc({
        headerHeight,
        footerHeight,
        sideWidth: width >= minSides ? Math.floor(width / 2) : width,
        visibleHeight,
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
          <meta name="viewport" content="initial-scale=1, width=device-width"/>
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
          <div className="header" style={{ height: HEADER_HEIGHT }}>
            <Menu pathname={pathname}/>
          </div>
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
  color: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  pathname: React.PropTypes.string,
  LayoutCalc: React.PropTypes.func,
};

Layout.defaultProps = {
  LayoutCalc,
};

Layout.childContextTypes = {
  layout: React.PropTypes.shape({
    headerHeight: React.PropTypes.number,
    footerHeight: React.PropTypes.number,
    sideWidth: React.PropTypes.number,
    visibleHeight: React.PropTypes.number,
  }),
};

export default Layout;
