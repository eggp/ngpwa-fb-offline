'use strict';

var nodeExternals = require('webpack-node-externals');

module.exports = {
  entry: __dirname + '/src/index.ts',
  output: {
    filename: 'lib/index.js',
    libraryTarget: 'this'
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  externals: [nodeExternals()]
};
