var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer');
var lodash = require('lodash');

var NODE_ENV = process.env.NODE_ENV;
var env = {
  production: NODE_ENV === 'production',
  dt: NODE_ENV === 'dt',
  staging: NODE_ENV === 'staging',
  test: NODE_ENV === 'test',
  development: NODE_ENV === 'development' || typeof NODE_ENV === 'undefined'
};
var stylePath = path.join(__dirname, '../styles');
var appCss = new ExtractTextPlugin({
  filename: 'YOUR_PACKAGE_NAME.css'
});

// set this as 'alias' in order to test platform-common-ui with rmm
var commonUiPath = path.join(__dirname, '..', '..', '..', 'projects', 'platform-common-ui');
console.log(commonUiPath);
function getConfigFile() {
  if (env.dt) {
    return 'app.config.dt.json';
  } else if (env.production) {
    return 'app.config.prod.json';
  }
  return 'app.config.dev.json';
}

function getProperties() {
  var fs = require('fs');
  var properties = require('properties');
  var propertyKeyValue = {};
  var propertiesFilePath = path.join(__dirname, '..', 'env.properties');

  var content = fs.readFileSync(propertiesFilePath, 'utf8');
  
  properties.parse(content, function (error, obj) {
    if (error) console.error(error);
    propertyKeyValue = obj;
  });

  return propertyKeyValue;
}

function getPublicPath() {
  var APP_CONFIG_FILE = getConfigFile();
  var propertyKeyValue = getProperties();
  var AppConfigPath = path.join(__dirname, APP_CONFIG_FILE);
  var STATIC_ASSET_SERVER = require(AppConfigPath).STATIC_ASSET_SERVER || '';
  var CURRENT_VERSION = propertyKeyValue.CURRENT_VERSION || '';
  var BUILD_NUMBER = propertyKeyValue.BUILD_NUMBER && env.dt ? `-${propertyKeyValue.BUILD_NUMBER}` : '';
  var PUBLIC_PATH = STATIC_ASSET_SERVER ? STATIC_ASSET_SERVER + CURRENT_VERSION + BUILD_NUMBER : '';
  return lodash.isEmpty(PUBLIC_PATH) ? '/' : `${PUBLIC_PATH}/`;
}

module.exports = {
  externals: {
    moment: 'moment'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: getPublicPath(),
    chunkFilename: '[name].[chunkhash].js'
  },

  resolve: {
    alias: {
      'app': path.resolve(__dirname, '../app'),
      'platform-common-ui': commonUiPath
    },
    extensions: ['.js', '.jsx', '.json'],
    modules: [
      path.resolve(__dirname, '../node_modules'),
      path.resolve(__dirname, '../app')
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      __DEV__: env.development,
      __STAGING__: env.staging,
      __PRODUCTION__: env.production || env.dt,
      __CURRENT_ENV__: '\'' + (NODE_ENV) + '\''
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'YOURPROJECTNAME.vendor'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.ProvidePlugin({
      'React': 'react'
    }),
    appCss
  ],

  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        include: path.join(__dirname, '../app'),
        use: 'babel-loader'
      },
      {
        test: /\.scss$/,
        include: stylePath,
        use: appCss.extract({
          use: [
            {
              loader: 'css-loader',
              options: { importLoaders: 1 }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: function () {
                  autoprefixer({
                    browsers: ['last 2 version', 'ie >= 11']
                  })
                }
              }
            },
            'sass-loader'
          ]
        })
      },
      {
        test: /\.(png|jpg|gif|mp4|ogg|svg)$/,
        include: path.join(__dirname, '../images'),
        use: 'file-loader?name=images/[hash].[ext]'
      }
    ]
  }
};
