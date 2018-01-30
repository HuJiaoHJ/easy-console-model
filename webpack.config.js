const common = require('./webpack/common.js');
const webpackMerge = require('webpack-merge');

const config = {
    entry: {'rcmodel.min': './lib/index.js'},
};

module.exports = webpackMerge(common, config);