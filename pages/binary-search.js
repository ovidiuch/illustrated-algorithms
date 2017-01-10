import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Layout from '../components/layout';
import Player from '../components/player';
import BinarySearch from '../components/illustrations/binary-search/binary-search';
import { BinarySearchLayoutCalc } from '../utils/layout-calc';

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
      <Layout
        color="#FF8A80"
        pathname={url.pathname}
        LayoutCalc={BinarySearchLayoutCalc}
        >
        <Player
          steps={steps}
          code={code}
          illustration={BinarySearch}
          />
      </Layout>
    );
  }
}

BinarySearchPage.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default BinarySearchPage;
