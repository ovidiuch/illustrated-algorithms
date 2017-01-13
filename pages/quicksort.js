import React from 'react';
import quicksort from '../algorithms/quicksort';
import Layout from '../components/layout';
import Player from '../components/player';
import RawData from '../components/illustrations/raw-data';
import RawDataLayoutCalc from '../utils/layout/raw-data-calc';

class Quicksort extends React.Component {
  static async getInitialProps() {
    const items = [
      'dog', 'cat', 'cow', 'fox', 'bear', 'pig', 'rat'
    ];
    return quicksort(items);
  }

  render() {
    const { steps, code, url } = this.props;
    return (
      <Layout
        color="#CCFF90"
        pathname={url.pathname}
        code={code}
        LayoutCalc={RawDataLayoutCalc}
        >
        <Player
          steps={steps}
          code={code}
          illustration={RawData}
          />
      </Layout>
    );
  }
}

Quicksort.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default Quicksort;
