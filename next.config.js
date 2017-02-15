module.exports = {
  webpack: config => {
    return Object.assign({}, config, {
      entry: Object.assign({}, config.entry, {
        'main.js': ['babel-polyfill'].concat(config.entry['main.js'])
      })
    });
  }
};
