import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Page from '../components/page';
import BinarySearch from '../components/illustrations/binary-search/binary-search';

class BinarySearchPage extends React.Component {
  static async getInitialProps() {
    const items = [
      'bear', 'cat', 'dog', 'lion', 'rat', 'snail'
    ];
    return binarySearch(items, 'dog');
  }

  render() {
    const { steps, code, url } = this.props;
    return (
      <Page
        color="#FF8A80"
        pathname={url.pathname}
        steps={steps}
        code={code}
        illustration={BinarySearch}
        />
    );
  }
}

BinarySearchPage.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default BinarySearchPage;
