export default {
  componentPaths: ['../components'],
  ignore: [/raw-data/],
  proxies: [
    './layout-proxy',
    './context-proxy',
    './global-style-proxy',
    './bg-color-proxy',
  ],
  publicPath: '../static',
};
