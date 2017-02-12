export default {
  componentPaths: ['../components'],
  ignore: [
    /binary-search\/((?!binary-search).)/,
  ],
  proxies: [
    './layout-proxy',
    './frame-proxy',
    './context-proxy',
    './global-style-proxy',
    './bg-color-proxy',
  ],
  publicPath: '../static',
};
