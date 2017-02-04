import React from 'react';
import bfs from '../algorithms/bfs';
import Page from '../components/page';
import Bfs from '../components/ill/bfs';

class BfsPage extends React.Component {
  static async getInitialProps() {
    const graph = {
      you: ['alice', 'bob', 'claire'],
      bob: ['anuj', 'peggy'],
      alice: ['peggy'],
      claire: ['thom', 'jonny'],
      anuj: [],
      peggy: [],
      thom: [],
      jonny: [],
    };
    const { steps } = bfs(graph, 'you');
    return {
      steps,
    };
  }

  render() {
    const { steps } = this.props;
    return (
      <Page
        currentPath="/bfs"
        steps={steps}
        illustration={Bfs}
        />
    );
  }
}

BfsPage.propTypes = {
  steps: React.PropTypes.array.isRequired,
};

export default BfsPage;
