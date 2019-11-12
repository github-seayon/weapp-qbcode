const path = require('path');

const config = {
  mode: 'production',
  entry: './index.js',
  output: {
    libraryTarget: 'umd',
    // library: "wxQbcode",
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

};
module.exports = config;
