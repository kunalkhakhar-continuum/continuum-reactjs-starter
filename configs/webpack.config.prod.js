var path = require('path');
var webpack = require('webpack');
var merge = require('webpack-merge');
var config = require('./webpack.config.base.js');
var vendors = require('./vendors');

module.exports = merge(config, {
  entry: {
    YOURPROJECTNAME: path.join(__dirname, '../app/main.jsx'),
    'YOURPROJECTNAME.vendor': vendors
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: {
        warnings: false,
        screw_ie8: true
      }
    })
  ]
});
