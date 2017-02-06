import React from 'react';
import Page from '../components/page';
import BinarySearch from '../components/ill/binary-search/binary-search';

export default class BinarySearchPage extends React.Component {
  render() {
    return (
      <Page
        currentPath="/binary-search"
        illustration={BinarySearch}
        />
    );
  }
}
