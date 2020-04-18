'use strict';

const path = require('path');
require("@babel/polyfill");

module.exports = {
    mode: 'production',

    entry: {
        main: ['@babel/polyfill', path.resolve('./content-scripts/index.js')]
    },

    output: {
        filename: '[name].bundle.js',
        path: path.resolve('./content-scripts/dist')
    },

    devtool: '#source-map',

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    }
};
