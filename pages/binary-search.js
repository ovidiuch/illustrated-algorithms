import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Page from '../components/page';
import BinarySearch from '../components/illustrations/binary-search/binary-search';

class BinarySearchPage extends React.Component {
  render() {
    return (
      <Page
        color="#FF8A80"
        currentPath="/binary-search"
        code={binarySearch.code}
        illustration={BinarySearch}
        />
    );
  }
}

export default BinarySearchPage;
