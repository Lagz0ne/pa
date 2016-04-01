const path = require('path');
const webpack = require('webpack');
const config = require('./webpack.config.production');

const compiler = webpack(config);

compiler.run((err, stats) => {
  console.log("Build finsihed");
});
