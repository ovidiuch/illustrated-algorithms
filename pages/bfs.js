import React from 'react';
import Page from '../components/page';
import bfs from '../algorithms/bfs';
import RawData from '../components/ill/raw-data';
import computeRawDataLayout from '../layout/bfs';

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
        computeLayout={computeRawDataLayout}
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
