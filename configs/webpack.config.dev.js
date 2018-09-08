const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const config = require('./webpack.config.base.js');
const vendors = require('./vendors');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const commonCss = new ExtractTextPlugin({ filename: 'platform-common-ui.css' });
const platformCommonUIPath = path.join(__dirname, '../node_modules/platform-common-ui/dist');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(config, {
    devtool: 'cheap-module-eval-source-map',
    entry: {
        YOURPROJECTNAME: [path.join(__dirname, '../app/main.jsx'), 'webpack-hot-middleware/client'],
        'YOURPROJECTNAME.vendor': vendors.concat(['webpack-hot-middleware/client'])
    },
    plugins: [
        new webpack.EvalSourceMapDevToolPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('development')
            }
        }),
        commonCss,
        new BundleAnalyzerPlugin(),
        new CopyWebpackPlugin([
            { from: 'images', to: 'images' }
        ])
    ],

    module: {
        rules: [
            {
                test: /\.css$/,
                include: platformCommonUIPath,
                use: commonCss.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        }
                    ]
                })
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                include: platformCommonUIPath,
                use: 'file-loader?mimetype=image/svg+xml&name=fonts/[name].[ext]'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                include: platformCommonUIPath,
                use: 'file-loader?mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                include: platformCommonUIPath,
                use: 'file-loader?mimetype=application/font-woff&name=fonts/[name].[ext]'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                include: platformCommonUIPath,
                use: 'file-loader?mimetype=application/octet-stream&name=fonts/[name].[ext]'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                include: platformCommonUIPath,
                use: 'file-loader&name=fonts/[name].[ext]'
            }
        ]
    }
});
