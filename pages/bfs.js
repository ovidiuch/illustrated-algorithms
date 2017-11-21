import React from 'react';
import Page from '../components/page';
import bfs from '../algorithms/bfs';
import RawData from '../components/illustrations/raw-data';
import computeBfsLayout from '../layout/bfs';
import computeRawDataFrame from '../frame/raw-data';

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
const name = 'you';

export default class BfsPage extends React.Component {
  render() {
    const { steps } = bfs(graph, name);

    return (
      <Page
        currentPath="/bfs"
        algorithm={bfs}
        illustration={RawData}
        computeLayout={computeBfsLayout}
        computeFrame={computeRawDataFrame}
        steps={[{
          intro: true,
          bindings: {
            graph,
            name,
          },
        }, ...steps]}
        actions={{}}
      />
    );
  }
}
