import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Layout from '../components/layout';
import Player from '../components/player';
import BinarySearch from '../components/illustrations/binary-search';

class BinarySearchPage extends React.Component {
  static async getInitialProps() {
    const items = [
      'bear', 'cat', 'lion', 'pig', 'rat', 'snail'
    ];
    return binarySearch(items, 'rat');
  }

  render() {
    const { steps, code, url } = this.props;
    return (
      <Layout color="#FF8A80" pathname={url.pathname}>
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
