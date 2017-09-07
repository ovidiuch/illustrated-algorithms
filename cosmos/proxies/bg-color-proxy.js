import createGlobalCssProxy from './global-css-proxy';

export default createGlobalCssProxy({
  getCss: ({ layout }) => {
    if (!layout) {
      return '';
    }

    return `body {
      background: ${layout.color};
    }`;
  }
});
