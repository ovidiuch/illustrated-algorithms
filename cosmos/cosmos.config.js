export default {
  componentPaths: ['../components'],
  ignore: [/binary-search\/((?!binary-search).)/],
  proxies: [
    './proxies/normalize-props-proxy',
    './proxies/layout-proxy',
    './proxies/frame-proxy',
    './proxies/context-proxy',
    './proxies/global-style-proxy',
    './proxies/bg-color-proxy',
  ],
  publicPath: '../static',
  publicUrl: '/static/',
};
