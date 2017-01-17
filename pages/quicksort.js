import React from 'react';
import quicksort from '../algorithms/quicksort';
import Page from '../components/page';
import RawData from '../components/illustrations/raw-data';

class Quicksort extends React.Component {
  static async getInitialProps() {
    const items = [
      'dog', 'cat', 'snail', 'bear', 'pig', 'rat'
    ];
    const { steps } = quicksort(items);
    return {
      steps,
    };
  }

  render() {
    const { steps } = this.props;
    return (
      <Page
        color="#FFD180"
        currentPath="/quicksort"
        code={quicksort.code}
        steps={steps}
        illustration={RawData}
        />
    );
  }
}

Quicksort.propTypes = {
  steps: React.PropTypes.array.isRequired,
};

export default Quicksort;
