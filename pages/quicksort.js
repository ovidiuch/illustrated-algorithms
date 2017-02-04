import React from 'react';
import quicksort from '../algorithms/quicksort';
import Page from '../components/page';
import Quicksort from '../components/ill/quicksort';

class QuicksortPage extends React.Component {
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
        currentPath="/quicksort"
        steps={steps}
        illustration={Quicksort}
        />
    );
  }
}

QuicksortPage.propTypes = {
  steps: React.PropTypes.array.isRequired,
};

export default QuicksortPage;
