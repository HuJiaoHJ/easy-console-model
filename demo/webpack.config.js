const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV || 'development';

let config;

const common = {
    entry: {
        index: path.resolve(__dirname, './index.js'),
    },
    output: {
        path: path.resolve(__dirname, './dist/'),
        filename: '[name].js',
    },
    module: {
        rules: [{
            enforce: 'pre',
            test: /\.[ej]s$/,
            exclude: /node_modules/,
            loader: 'eslint-loader',
        }, {
            test: /\.[ej]s$/,
            include: /node_modules\/@hfe\/timoo-/,
            loader: 'babel-loader',
        }, {
            test: /\.[ej]s$/,
            include: /node_modules\/hfe\/timoo-/,
            loader: 'babel-loader',
        }, {
            test: /\.[ej]s$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loader: 'style-loader!css-loader',
        }, {
            test: /\.scss$/,
            loader: 'style-loader!css-loader!sass-loader!postcss-loader',
        }, {
            test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
            loader: 'file-loader?name=[hash:8].[ext]',
        }, {
            test: /\.png$/,
            loader: 'file-loader?name=[hash:8].[ext]',
        }, {
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: {
                    scss: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                    sass: 'vue-style-loader!css-loader!postcss-loader!sass-loader',
                }
            }
        }],
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
            },
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './index.html'),
            inject: false,
            minify: false,
        }),
    ],
    resolve: {
        extensions: ['.js', '.vue', '.scss'],
        alias: {
            'lib': path.resolve(__dirname, '../lib'),
            'vue': 'vue/dist/vue.esm.js',
        },
    },
    node: {
        process: false,
        setImmediate: false
    },
    performance: {
        hints: false
    },
    externals: {

    },
};

if (env === 'development') {
    config = webpackMerge(common, {
        output: {
            pathinfo: true,
            filename: '[name].js',
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.NoEmitOnErrorsPlugin(),
            new webpack.NamedModulesPlugin(),
        ],
        devtool: 'eval-source-map',
        cache: true,
        devServer: {
            host: 'localhost',
            disableHostCheck: true,
            port: 8080,
            historyApiFallback: true,
            inline: true,
            hot: true,
            stats: {
                children: false,
                chunks: false
            }
        }
    });
} else {
    config = common;
}

module.exports = config;