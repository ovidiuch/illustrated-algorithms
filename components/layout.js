import React from 'react';
import Head from 'next/head';
import Menu from '../components/menu';

const Layout = ({
  children,
  color,
  pathname,
}) => (
  <div>
    <Head>
      <style>{`
        body {
          background: ${color};
          transition: background 0.5s;
          font-family: sans-serif;
        }
      `}</style>
    </Head>
    <Menu pathname={pathname}/>
    {children}
  </div>
);

Layout.propTypes = {
  color: React.PropTypes.string,
  children: React.PropTypes.oneOfType([
    React.PropTypes.arrayOf(React.PropTypes.node),
    React.PropTypes.node
  ]),
  pathname: React.PropTypes.string,
};

export default Layout;
