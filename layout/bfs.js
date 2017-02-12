import computeRawDataLayout from './raw-data';

export default init => {
  const base = computeRawDataLayout(init);
  const {
    getRelSize,
  } = base;

  return {
    ...base,
    color: '#80D8FF',

    // Hardcoded to fit raw data from Bfs
    illustrationHeight: getRelSize(164, 1),
  };
};
