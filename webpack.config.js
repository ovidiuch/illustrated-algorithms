const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './binary-search',
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
    }],
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
