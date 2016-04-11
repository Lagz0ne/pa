const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  context: __dirname, // input path
  devtool: 'inline-source-map',
  entry: [ // webpack will start consuming from these file(s)
    'webpack-hot-middleware/client',
    './app/app.jsx'
  ],
  output: {
    path: path.join(__dirname, 'build'), // output path
    filename: 'bundle.js', // compiled js (single file only)
    publicPath: '/'
  },
  resolve: {
    extensions: ['', '.jsx', '.scss', '.js', '.json', '.png'], // along the way, subsequent file(s) to be consumed by webpack
    modulesDirectories: [
      'node_modules',
      path.resolve(__dirname, './node_modules')
    ],
    alias: {
      components: __dirname + '/app/components',
      actions: __dirname + '/app/actions'
    }
  },
  module: {
    loaders: [{
      test: /(\.js|\.jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel'
    }, {
      test: /(\.scss|\.css)$/,
      loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
    }, { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192' } ]
  },
  postcss: [autoprefixer],
  plugins: [
    new ExtractTextPlugin('pulse.css', {
      allChunks: true
    }), // compiled css (single file only)
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};
