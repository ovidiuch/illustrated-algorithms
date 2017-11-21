import React from 'react';
import offsetSteps from '../utils/offset-steps';
import Page from '../components/page';
import binarySearch from '../algorithms/binary-search';
import BinarySearch from '../components/illustrations/binary-search/binary-search';
import computeBinarySearchLayout from '../layout/binary-search';
import computeBinarySearchFrame from '../frame/binary-search';

const list = ['bear', 'cat', 'dog', 'lion', 'panda', 'snail'];

const getIntroStep = () => ({
  intro: true,
  bindings: {
    list,
  },
});

export default class BinarySearchPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleGenerateSteps = this.handleGenerateSteps.bind(this);

    this.state = {
      steps: [getIntroStep()]
    };
  }

  render() {
    return (
      <Page
        currentPath="/binary-search"
        algorithm={binarySearch}
        illustration={BinarySearch}
        computeLayout={computeBinarySearchLayout}
        computeFrame={computeBinarySearchFrame}
        steps={this.state.steps}
        actions={{
          generateSteps: this.handleGenerateSteps,
        }}
      />
    );
  }

  handleGenerateSteps(item, cb) {
    const { steps } = binarySearch(list, item);

    this.setState({
      steps: [getIntroStep(), ...offsetSteps(steps, 1)],
    }, cb);
  }
}
