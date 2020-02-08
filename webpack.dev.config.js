const path =require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const htmlArr =require("./webpackConfig/htmlConfig");// html配置

module.exports = webpackMerge(baseWebpackConfig,{
    mode: 'development',
    output: {
        filename: 'static/js/[name].[hash].js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.less$/,
                use: ['style-loader','css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyVars:{
                            'hack': `true; @import "${path.join(__dirname,'./src/assets/less/modify.less')}";`,
                        },
                        javascriptEnabled: true,
                    },
                },
            ]
            },
        ]
    },
    plugins:[
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            {
                from: path.join(__dirname, './src/public'),  // 从哪个目录copy
                to: "static", // copy到那个目录
                ignore: ['.*']
            }
        ]),
        new HtmlWebpackPlugin({
            chunks:['app'],
            template:'./src/index.html',
            filename:'index.html',
        })
    ].concat(htmlArr),
    devServer: {
        historyApiFallback: true, // 当找不到路径的时候，默认加载index.html文件
        hot: true,
        open: true,
        compress: true, // 一切服务都启用gzip 压缩：
        port: "8081",
        proxy: {
            // 接口请求代理
            '/api': 'http://localhost:8080'
        },
    }
})