import createGlobalCssProxy from './global-css-proxy';

export default createGlobalCssProxy({
  getCss: () =>
    `body {
      margin: 0;
      padding: 0;
      font-family: 'Helvetica Neue', Helvetica, sans-serif;
    }
    @font-face {
      font-family: 'FiraCode-Light';
      src: url('/static/FiraCode-Light.woff');
    }
    pre,
    .code {
      font-family: 'FiraCode-Light';
    }`
});
