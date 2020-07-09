const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(webpackConfig,{
    devtool:"cheap-module-eval-source-map",// 开发环境配置
    devServer:{
        port:8089,
        host:'127.0.0.1',
        open:true,
        hot:true,
        overlay:{erros:true}
    },
    plugins:[
        new Webpack.HotModuleReplacementPlugin()
    ]
})
