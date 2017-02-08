import computeRawDataLayout from './raw-data';

export default init => ({
  ...computeRawDataLayout(init),
  color: '#80D8FF',
});
