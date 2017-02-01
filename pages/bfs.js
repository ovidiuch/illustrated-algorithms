import React from 'react';
import bfs from '../algorithms/bfs';
import Page from '../components/page';
import RawData from '../components/ill/raw-data';

class Bfs extends React.Component {
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
        color="#80D8FF"
        currentPath="/bfs"
        code={bfs.code}
        steps={steps}
        illustration={RawData}
        />
    );
  }
}

Bfs.propTypes = {
  steps: React.PropTypes.array.isRequired,
};

export default Bfs;
