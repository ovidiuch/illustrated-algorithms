export default {
  componentPaths: ['../components'],
  ignore: [
    /binary-search\/((?!binary-search).)/,
  ],
  proxies: [
    './proxies/layout-proxy',
    './proxies/frame-proxy',
    './proxies/context-proxy',
    './proxies/global-style-proxy',
    './proxies/bg-color-proxy',
  ],
  publicPath: '../static',
};
