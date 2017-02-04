import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Page from '../components/page';
import BinarySearch from '../components/ill/binary-search/binary-search';

class BinarySearchPage extends React.Component {
  render() {
    return (
      <Page
        currentPath="/binary-search"
        code={binarySearch.code}
        illustration={BinarySearch}
        />
    );
  }
}

export default BinarySearchPage;
