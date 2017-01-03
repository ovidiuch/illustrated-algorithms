import HtmlWebpackPlugin from 'html-webpack-plugin';

export default {
  module: {
    loaders: [{
      loader: 'babel',
      exclude: /node_modules/,
      test: /\.jsx?$/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ]
};
