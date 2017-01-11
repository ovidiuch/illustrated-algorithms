import React from 'react';
import Link from 'next/link';

const pathLabels = {
  '/binary-search': 'binary search',
  '/quicksort': 'quicksort',
  '/bfs': 'bfs',
};

const renderLink = (href, currentPath) => (
  <span className="link">
    {href === currentPath ?
      <span>{pathLabels[href]}</span> :
      <Link href={href}><a>{pathLabels[href]}</a></Link>}
    <style jsx>{`
      .link {
        margin-right: 4px;
      }
    `}</style>
  </span>
);

const Menu = ({ pathname }, { layout }) => (
  <div style={{ height: layout.headerHeight }}>
    {renderLink('/binary-search', pathname)}
    {renderLink('/quicksort', pathname)}
    {renderLink('/bfs', pathname)}
  </div>
);

Menu.propTypes = {
  pathname: React.PropTypes.string,
};

Menu.contextTypes = {
  layout: React.PropTypes.object,
};

export default Menu;
