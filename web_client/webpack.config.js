var webpack = require('webpack');

module.exports = {
    entry: "./index.js",
    output: {
        filename: "../bundle.js"
    },
    module: {
        loaders: [
            {
                exclude: /(node_moudles|app-server.js)/,
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
    ]
};