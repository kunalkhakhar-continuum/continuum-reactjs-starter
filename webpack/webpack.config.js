const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

const {
    webpackUtils,
    COMMON_EXTERNALS,
    providePlugin,
    platformLibsDefinitions
} = require('platform-common-ui-lib');

// webpack will generate a .js file with the packageName specified

const packageName = 'YOURPROJECTNAME';
const {
    pkgRootPath,
    pkgSrcPath,
    buildPath,
    bundleAnalyzerPlugin,
    uglifyPlugin
} = webpackUtils.baseLibImportsAndVars(packageName, 'app');
const cssPlugin = webpackUtils.cssExtractPlugin(packageName);
const stylePath = path.join(pkgRootPath, 'styles');
const NODE_ENV = process.env.NODE_ENV;
const env = webpackUtils.envFromNodeEnv(NODE_ENV);
const devtool = webpackUtils.getWebpackDevTool(NODE_ENV);

const basePlugins = [
    new webpack.DefinePlugin({
        __DEV__: env.development,
        __STAGING__: env.staging,
        __PRODUCTION__: env.production || env.dt,
        __CURRENT_ENV__: NODE_ENV,
        production: JSON.stringify('production'),
        NODE_ENV: JSON.stringify('production'),
        'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.ProvidePlugin({
        ...providePlugin
    }),
    cssPlugin,
    bundleAnalyzerPlugin
];

const envPlugins = env.build ? [
    uglifyPlugin
] : [];

const nodeEnv = NODE_ENV || 'development';
const plugins = basePlugins.concat(envPlugins);
const publicPath = webpackUtils.getPublicPath(nodeEnv, pkgRootPath, packageName);
const {
    libraryName
} = platformLibsDefinitions.PLATFORM_COMMON_VENDOR;

module.exports = {
    context: pkgRootPath,
    entry: {
        rmm: [path.join(pkgSrcPath, 'main.jsx')]
    },
    externals: COMMON_EXTERNALS,
    devtool,
    output: {
        path: buildPath,
        filename: '[name].js',
        publicPath,
        chunkFilename: '[name].js',
        library: {
            root: libraryName,
            amd: packageName,
            commonjs: packageName
        },
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            app: path.resolve(pkgSrcPath)
        },
        extensions: ['.js', '.jsx', '.json'],
        modules: [
            path.resolve(pkgRootPath, 'node_modules'),
            path.resolve(pkgSrcPath, 'app'),
            path.join(pkgRootPath, 'styles')
        ]
    },
    plugins,
    module: {
        rules: [
            {
                test: /\.js$|\.jsx$/,
                include: pkgSrcPath,
                use: 'babel-loader'
            },
            {
                test: /\.scss$/,
                include: stylePath,
                use: cssPlugin.extract({
                    use: [
                        {
                            loader: 'css-loader',
                            options: { importLoaders: 1 }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => {
                                    autoprefixer({
                                        browsers: ['last 2 version', 'ie >= 11']
                                    });
                                }
                            }
                        },
                        'sass-loader'
                    ]
                })
            },
            {
                test: /\.(png|jpg|gif|mp4|ogg|svg)$/,
                include: path.join(pkgRootPath, 'images'),
                use: 'file-loader?name=images/[hash].[ext]'
            }
        ]
    }
};
