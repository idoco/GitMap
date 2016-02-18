var webpack = require('webpack');

module.exports = {
    entry: "./app.js",
    output: {
        filename: "../bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'jsxhint-loader'
            }
        ],
        loaders: [
            {
                exclude: /node_moudles/,
                loader: 'babel',
                query: {
                    presets:['react']
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ],

    devtool: 'source-map',
    jshint: {
        esversion: 6
    }
};