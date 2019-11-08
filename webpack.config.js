const path = require('path');

const config = {
  entry: './src/index.js',
  output: {
    // libraryTarget: 'commonjs',
    // library: "wxQbcode",
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
  },

};
module.exports = config;
