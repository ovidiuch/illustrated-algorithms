import React from 'react';
import bfs from '../algorithms/bfs';
import Page from '../components/page';
import RawData from '../components/illustrations/raw-data';

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

    return bfs(graph, 'you');
  }

  render() {
    const { steps, code, url } = this.props;
    return (
      <Page
        color="#80D8FF"
        pathname={url.pathname}
        steps={steps}
        code={code}
        illustration={RawData}
        />
    );
  }
}

Bfs.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default Bfs;
