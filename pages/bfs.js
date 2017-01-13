import React from 'react';
import bfs from '../algorithms/bfs';
import Layout from '../components/layout';
import Player from '../components/player';
import RawData from '../components/illustrations/raw-data';
import RawDataLayoutCalc from '../utils/layout/raw-data-calc';

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
      <Layout
        color="#80D8FF"
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

Bfs.propTypes = {
  steps: React.PropTypes.array.isRequired,
  code: React.PropTypes.string.isRequired,
  url: React.PropTypes.object.isRequired,
};

export default Bfs;
