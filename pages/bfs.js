import React from 'react';
import Page from '../components/page';
import Bfs from '../components/ill/bfs';

export default class BfsPage extends React.Component {
  render() {
    const { graph, name } = Bfs.initialData;
    const { steps } = Bfs.algorithm(graph, name);

    return (
      <Page
        currentPath="/bfs"
        illustration={Bfs}
        steps={steps}
        />
    );
  }
}
