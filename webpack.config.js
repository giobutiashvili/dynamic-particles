const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'DynamicConnector',
    libraryTarget: 'umd'
  },
  mode: 'production'
};