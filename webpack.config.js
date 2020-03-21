const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dirNode = 'node_modules';
const dirApp = path.join(__dirname, 'src');
const dirAssets = path.join(__dirname, 'assets');
const serviceWorker = path.join(__dirname, 'service-worker.js');

/**
 * Webpack Configuration
 */
module.exports = {
    
    entry: {
        'main': path.join(dirApp, 'main'),
        'components': path.join(dirApp, 'components'),
        //'webcomponents-loader': path.join('@webcomponents/webcomponentsjs', 'webcomponents-loader'),
        // Removing WC polyfill bundles for dev
        //'bundles/webcomponents-sd-ce-pf': path.join('@webcomponents/webcomponentsjs/bundles', 'webcomponents-sd-ce-pf'),
        //'bundles/webcomponents-sd-ce': path.join('@webcomponents/webcomponentsjs/bundles', 'webcomponents-sd-ce'),
        //'bundles/webcomponents-sd': path.join('@webcomponents/webcomponentsjs/bundles', 'webcomponents-sd'),
        //'bundles/webcomponents-ce': path.join('@webcomponents/webcomponentsjs/bundles', 'webcomponents-ce')
        'service-worker': serviceWorker
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js'
    },
    resolve: {
        modules: [
            dirNode,
            dirApp,
            dirAssets
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'index.ejs'),
            inject: 'body',
            // Order of the script tags is important here. The polyfills have to load first.
            //chunks: ['webcomponents-loader', 'vendor', 'main', 'components'],
            //chunksSortMode: 'manual'
        })
    ],
    module: {
        rules: [
            // BABEL
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /(node_modules)/,
                options: {
                    compact: true
                }
            },
            // STYLES
            {
                test:/\.css$/,
                use:['css-loader']
            },
            // SVG
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            },
            // IMAGES
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            }
        ]
    }
};