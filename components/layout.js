/* global window */

import React from 'react';
import Head from 'next/head';
import Menu from '../components/menu';

const getWindowWidth = () => window.innerWidth;

class Layout extends React.Component {
  constructor(props) {
    super(props);

    this.handleResize = this.handleResize.bind(this);

    this.state = {
      renderedOnClient: false,
      width: 320,
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize);

    this.setState({
      renderedOnClient: true,
      width: getWindowWidth(),
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize() {
    this.setState({ width: getWindowWidth() });
  }

  getChildContext() {
    const { width } = this.state;
    return {
      // iPad mini landscape is 1024
      sideWidth: width >= 800 ? width / 2 : width,
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
          <style>{`
            body {
              margin: 0;
              padding: 0;
              background: ${color};
              transition: background 0.5s;
              font-family: sans-serif;
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
  color: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  pathname: React.PropTypes.string,
};

Layout.childContextTypes = {
  sideWidth: React.PropTypes.number,
};

export default Layout;
