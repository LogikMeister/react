const path =require('path');
const webpackMerge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.config');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const htmlArr =require("./webpackConfig/htmlConfig");// html配置


module.exports = webpackMerge(baseWebpackConfig,{
    output: {
        filename: 'static/js/[name].[hash].js',
        chunkFilename: 'static/js/[name].[chunkhash].js',
        path: path.join(__dirname, 'dist'),
    },
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader,'css-loader']
            },
            {
                test: /\.less$/,
                use: [MiniCssExtractPlugin.loader,'css-loader',
                {
                    loader: 'less-loader',
                    options: {
                        modifyvars:{
                            'hack': `true; @import "./src/assets/less/modify.less";`,
                        },
                        javascriptEnabled: true,
                    },
                },
            ]
            },
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({filename: 'static/css/[name].[hash].css', chunkFilename: 'static/css/[id].css'}),
        new CleanWebpackPlugin(),
        new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            chunks:['app'],
            template:'./src/index.html',
            filename:'index.html',
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeAttributeQuotes: true
            }
        })
    ].concat(htmlArr),//添加modules下的入口对应Html
    optimization: { //webpack4.x的代码压缩和拆包都在这里处理，这是和webpack3.x的不同 npm上给出实例是在plugins里配置的 minimizer配置
        minimizer: [  //会将WEBPACK默认的js压缩方式给覆盖掉了，故重新配置js压缩，采用uglifyjs-webpack-plugin插件，配置在minimizer中。
            new OptimizeCssAssetsPlugin({
                cssProcessorOptions: { 
                    discardComments: { removeAll: true } // 移除注释
                } 
            }),
            new UglifyJsPlugin({
                parallel: true,  //使用多进程并行运行来提高构建速度
                sourceMap: false,
                uglifyOptions: {
                    warnings: false,
                    compress: {
                        unused: true,
                        drop_debugger: true,
                        drop_console: true, 
                    },
                    output: {
                        comments: false // 去掉注释
                    }
                }
            })
        ],
        splitChunks: {
            // async表示只从异步加载得模块（动态加载import()）里面进行拆分
            // initial表示只从入口模块进行拆分
            // all表示以上两者都包括
            chunks: "all", //表示从哪些chunks里面抽取代码 "async" "initial"
            minSize: 30000,   // 大于30k会被webpack进行拆包
            minSize: 0, //表示抽取出来的文件在压缩前的最小大小，默认为 30000
            // import()文件本身算一个
            // 只计算js，不算css
            // 如果同时有两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
            maxAsyncRequests: 5,  // 最大的按需加载（异步）请求次数
            // 最大的初始化加载请求次数,为了对请求数做限制，不至于拆分出来过多模块
            // 入口文件算一个
            // 如果这个模块有异步加载的不算
            // 只算js，不算css
            // 通过runtimeChunk拆分出来的runtime不算在内
            // 如果同时又两个模块满足cacheGroup的规则要进行拆分，但是maxInitialRequests的值只能允许再拆分一个模块，那尺寸更大的模块会被拆分出来
            maxInitialRequests: 5,
            automaticNameDelimiter: '~', // 打包分隔符
            name:true,
            cacheGroups: {
                // 默认的配置
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                // 默认的配置，vendors规则不命中的话，就会命中这里
                default: {
                    minChunks: 2, // 引用超过两次的模块 -> default
                    priority: -20,
                    reuseExistingChunk: true
                },
                antdui: {
                    priority: 2,  
                    test: /[\\/]node_modules[\\/](antd)[\\/]/,  //(module) => (/antd/.test(module.context)),
                },
                antdicon:{
                    priority: 4,
                    test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
                },
                // 拆分基础插件
                basic: {
                    priority: 3, 
                    test: /[\\/]node_modules[\\/](moment|react|react-dom|react-router|react-router-dom|axios)[\\/]/,
                }
            },
        }
    }
})