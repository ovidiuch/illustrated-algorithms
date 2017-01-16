import React from 'react';
import quicksort from '../algorithms/quicksort';
import Page from '../components/page';
import RawData from '../components/illustrations/raw-data';

class Quicksort extends React.Component {
  static async getInitialProps() {
    const items = [
      'dog', 'cat', 'snail', 'bear', 'pig', 'rat'
    ];
    return quicksort(items);
  }

  render() {
    const { steps, code, url } = this.props;
    return (
      <Page
        color="#FFD180"
        pathname={url.pathname}
        steps={steps}
        code={code}
        illustration={RawData}
        />
    );
  }
}

Quicksort.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default Quicksort;
