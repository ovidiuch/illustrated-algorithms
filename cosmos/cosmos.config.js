export default {
  componentPaths: ['../components'],
  ignore: [/raw-data/],
  proxies: [
    './layout-proxy',
    './context-proxy'
  ],
  publicPath: '../static',
};
