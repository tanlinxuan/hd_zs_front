const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const {VueLoaderPlugin}=require('vue-loader')

const  mode=process.env.NODE_ENV
const  isDev= mode==='development'?true:false
module.exports = {
    //mode:'development', // 开发模式
    entry: path.resolve(__dirname,'src/main.js'),    // 入口文件
    output:{
        path:path.resolve(__dirname,'dist'),
       // publicPath: './',
        filename:isDev?'js/[name].js':'js/[name].[hash:8].js',
        chunkFilename:isDev?'js/[name].js':'js/[name].[hash:8].js'
    },
    mode:mode,
    module:{
        rules:[
            {
                test:/\.vue$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use:[{
                    loader:'vue-loader',
                    options:{
                        compilerOptions:{
                            preserveWhitespace:false
                        }
                    }
                }]
            },
            {
                test:/\.(js|jsx)$/,
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use:[{
                    loader: "thread-loader",
                    options: {
                        workers: 2,
                        workerParallelJobs: 20,
                        workerNodeArgs: ['--max-old-space-size=1024'],
                        poolRespawn: false,
                        poolTimeout: 2000,
                        poolParallelJobs: 100,
                    }
                },{
                    loader:'babel-loader',
                    options:{
                        presets:['@babel/preset-env']
                    }
                }]
            },
            {
                test:/\.(css|less)$/,
                use:[
                    'style-loader',
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader:'postcss-loader',
                        options:{
                            plugins:[require('autoprefixer')({
                                overrideBrowserslist: ['last 30 versions', "> 2%", "Firefox >= 10", "ie 6-11"]
                            })]
                        }
                    },
                    'less-loader'
                ] // 从右向左解析原则
            },
            {
                test: /\.(jpe?g|png|gif)$/i, //图片文件
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src'),
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:10*1024,
                            publicPath:'../',
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'img/[name].[hash:8].[ext]'
                                }
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit:1024*5,
                            publicPath:'../',
                            fallback: {
                                loader: 'file-loader',
                                options: {
                                    name: 'fonts/[name].[hash:8].min.[ext]'
                                }
                            },
                        }
                    }
                ]
            }
        ]
    },
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.esm.js',
            '@src':path.resolve(__dirname,'src'),
            '@utils':path.resolve(__dirname,'src/utils'),
            '@pages':path.resolve(__dirname,'src/pages'),
            '@router':path.resolve(__dirname,'src/router'),
            '@public':path.resolve(__dirname,'src/public'),
            '@httpServer':path.resolve(__dirname,'src/httpServer'),
        },
        extensions:['*','.js','.jsx','.vue']
    },
    plugins:[
        new VueLoaderPlugin(),
        new CleanWebpackPlugin({
            path:'./dist'
        }),
        new HtmlWebpackPlugin({
            template:'./index.html',
            inject: 'body',
            minify: {
                removeComments: true
            }
        }),
        new MiniCssExtractPlugin({
            filename:isDev?'css/[name].css': "css/[name].[hash:8].css",
            chunkFilename: isDev?'css/[id].css':"css/[id].[hash:8].css",
        })
    ],
}