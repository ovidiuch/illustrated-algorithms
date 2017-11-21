import React from 'react';
import shuffle from 'shuffle-array';
import offsetSteps from '../utils/offset-steps';
import Page from '../components/page';
import quicksort from '../algorithms/quicksort';
import Quicksort from '../components/illustrations/quicksort/quicksort';
import computeQuicksortLayout from '../layout/quicksort';
import computeQuicksortFrame from '../frame/quicksort';

const initialList = ['cherries', 'kiwi', 'grapes', 'avocado', 'pineapple', 'peach'];

const getIntroStep = list => ({
  intro: true,
  bindings: {
    list,
  },
});

export default class QuicksortPage extends React.Component {
  constructor(props) {
    super(props);

    this.handleShuffleInput = this.handleShuffleInput.bind(this);
    this.handleGenerateSteps = this.handleGenerateSteps.bind(this);

    this.state = {
      list: initialList,
      steps: [getIntroStep(initialList)]
    };
  }

  render() {
    return (
      <Page
        currentPath="/quicksort"
        algorithm={quicksort}
        illustration={Quicksort}
        computeLayout={computeQuicksortLayout}
        computeFrame={computeQuicksortFrame}
        steps={this.state.steps}
        actions={{
          shuffleInput: this.handleShuffleInput,
          generateSteps: this.handleGenerateSteps,
        }}
      />
    );
  }

  handleShuffleInput(cb) {
    const list = shuffle(initialList, { copy: true });

    this.setState({
      list,
      steps: [getIntroStep(list)]
    }, cb);
  }

  handleGenerateSteps(cb) {
    const { list } = this.state;
    const { steps } = quicksort(list);

    this.setState({
      steps: [getIntroStep(list), ...offsetSteps(steps, 1)],
    }, cb);
  }
}
