const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');
const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');


const environment = process.env.NODE_ENV;

const plugins = [
    new webpack.ContextReplacementPlugin(
        /moment[\/\\]locale$/,
        /en|es|ca|de|it|nl|fr|pt|ru|sv|zh|ja|da|ar|id|ko|ms|no|tl|th|tr|vi/
    ),
    // Debug the size of bundles
    new DuplicatePackageCheckerPlugin(),
    // new Visualizer()
];

if (environment === 'production') {
    plugins.push(new webpack.optimize.DedupePlugin());
    plugins.push(new webpack.optimize.OccurrenceOrderPlugin());
    plugins.push(new webpack.optimize.UglifyJsPlugin());
    plugins.push(new webpack.DefinePlugin({
        // removes a lot of debugging code in React
        'process.env': {
            BROWSER: true,
            NODE_ENV: JSON.stringify(environment)
        }
    }));
}

module.exports = {
    entry: './index.js',

    output: {
        path: 'public',
        filename: 'bundle.js',
        publicPath: '/'
    },

    plugins,

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!roi-.*)/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react'
            },
            {
                test: /\.css$/,
                loaders: [ 'style-loader', 'css-loader' ]
            }
        ]
    }
}
