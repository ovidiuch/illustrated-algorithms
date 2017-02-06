import React from 'react';
import Page from '../components/page';
import Quicksort from '../components/ill/quicksort';

export default class QuicksortPage extends React.Component {
  render() {
    const { list } = Quicksort.initialData;
    const { steps } = Quicksort.algorithm(list);

    return (
      <Page
        currentPath="/quicksort"
        illustration={Quicksort}
        steps={steps}
        />
    );
  }
}
