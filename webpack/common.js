const path = require('path');
const webpack = require('webpack');
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

const config = {
    output: {
        path: path.resolve(__dirname, '../dist/'),
        library: 'easyConsole',
        libraryTarget: 'umd',
        umdNamedDefine: true,
        filename: '[name].js',
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new ParallelUglifyPlugin({
            cacheDir: '.cache/',
            uglifyJS:{
                output: {
                    comments: false
                },
                compress: {
                    warnings: false
                },
            },
        }),
    ],
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory',
        }],
    },
    node: {
        process: false,
        setImmediate: false
    },
    performance: {
        hints: false
    },
    stats: {
        children: false,
        chunks: false,
    },
    bail: true,
};

module.exports = config;