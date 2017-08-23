const path = require('path');
const webpack = require('webpack');
const BabiliPlugin = require('babili-webpack-plugin');
const pkg = require('./package.json');

let banner =
  `OBS WebSocket Javascript API (${pkg.name}) v${pkg.version}\n` +
  `Author: ${pkg.author}\n` +
  `License: ${pkg.license}\n` +
  `Repository: ${pkg.repoUrl}\n` +
  `Build Timestamp: ${pkg.timestamp || new Date().toISOString()}`;

banner += pkg.sha ? `\nBuilt from Commit: ${pkg.repoUrl}/commit/${pkg.sha}` : ``;

module.exports = {
  target: 'web',
  stats: 'detailed',
  entry: {
    'obs-websocket': './index.js',
    'obs-websocket.min': './index.js'
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    library: 'OBSWebSocket'
  },
  externals: {
    ws: 'WebSocket'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
      // query: {
      //   presets: ['es2015']
      // }
    }]
  },
  devtool: 'source-map',
  plugins: [
    new BabiliPlugin({}, {
      test: /\.min\.js($|\?)/i,
      comments: false
    }),
    new webpack.BannerPlugin({banner})
  ]
};
