import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Page from '../components/page';
import BinarySearch from '../components/illustrations/binary-search/binary-search';

class BinarySearchPage extends React.Component {
  render() {
    const { url } = this.props;
    return (
      <Page
        color="#FF8A80"
        pathname={url.pathname}
        code={binarySearch.code}
        illustration={BinarySearch}
        />
    );
  }
}

BinarySearchPage.propTypes = {
  url: React.PropTypes.object.isRequired,
};

export default BinarySearchPage;
