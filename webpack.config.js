const { CheckerPlugin } = require('awesome-typescript-loader');
const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: 'awesome-typescript-loader',
        exclude: [ /node_modules/ ]
      }
    ]
  },
  mode: 'production',
  //devtool: 'source-map',
  resolve: {
    extensions: ['.ts', '.js']
  },
  plugins: [
    new CheckerPlugin()
  ],
  externals: [ nodeExternals() ],
  output: {
    libraryTarget: 'commonjs',
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
};