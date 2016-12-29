import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  module: {
    loaders: [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      test: /\.jsx?$/,
    }]
  },
  plugins: [
    new HtmlWebpackPlugin(),
  ]
};
