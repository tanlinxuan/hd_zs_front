const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
const TerserPlugin = require('terser-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
module.exports = WebpackMerge(webpackConfig,{
    devtool:"cheap-module-source-map",
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    chunks: 'initial',
                    minChunks: 2,
                    maxInitialRequests: 5,
                    minSize: 0,
                    name: 'common'
                }
            }
        },
        minimize: true,
        minimizer: [new TerserPlugin({
            test: /\.(js|jsx)$/i,
            include:/src/,
            sourceMap: true,
            parallel: 4,
        })],
    },
    plugins:[
        new HardSourceWebpackPlugin(), //不再需要dll
    ]
})
