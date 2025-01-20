const webpack = require('webpack');
const dotenv = require('dotenv');

const merge = require('webpack-merge');
const webpackConfig = require('./webpack.config');

module.exports = merge(webpackConfig, {

    mode: 'development',
    //devtool: false,
    devtool: 'eval-source-map',

    output: {
        pathinfo: true,
        publicPath: '/',
        filename: '[name].js'
    },

    devServer: {
        host: 'localhost'
    },

    plugins: [
        new webpack.DefinePlugin({
          'process.env': JSON.stringify(dotenv.config().parsed)
        })
    ]

});