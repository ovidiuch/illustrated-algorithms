import React from 'react';
import binarySearch from '../algorithms/binary-search';
import Layout from '../components/layout';
import SourceCode from '../components/source-code';
import BinarySearch from '../components/binary-search';

class BinarySearchPage extends React.Component {
  static async getInitialProps() {
    const items = [
      'bear', 'cat', 'lion', 'pig', 'rat', 'snail'
    ];
    return binarySearch(items, 'rat');
  }

  constructor(props) {
    super(props);

    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);

    this.state = {
      stepIndex: 0,
    };
  }

  handlePrev() {
    this.setState({
      stepIndex: this.state.stepIndex - 1,
    });
  }

  handleNext() {
    this.setState({
      stepIndex: this.state.stepIndex + 1,
    });
  }

  render() {
    const { steps, code, url } = this.props;
    const { stepIndex } = this.state;

    const step = steps[stepIndex];
    const { line, start, end } = step;

    return (
      <Layout color="#FF8A80" pathname={url.pathname}>
        <div>
          <button disabled={stepIndex <= 0} onClick={this.handlePrev}>back</button>
          <button disabled={stepIndex >= steps.length - 1} onClick={this.handleNext}>forward</button>
        </div>
        <SourceCode
          def={code}
          line={line}
          start={start}
          end={end}
          />
        <BinarySearch
          step={step}
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
