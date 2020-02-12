const path =require('path');
const getEntry = require("./webpackConfig/getEntry");//entry遍历函数
const entry = getEntry("./src/modules");

module.exports = {
    entry: entry,//默认子目录下入口chunk['app'],多入口实现在modules文件下添加
    module:{
        rules:[
            {
                test:/\.(js|jsx)$/,
                exclude: path.join(__dirname, 'node_modules'),
                use:['babel-loader']
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // url-loader 包含file-loader，这里不用file-loader, 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/img/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000, // 小于10000B的图片base64的方式引入，大于10000B的图片以路径的方式导入
                    name: 'static/fonts/[name].[hash:7].[ext]'
                }
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.json', '.jsx'], // 解析扩展。（当我们通过路导入文件，找不到改文件时，会尝试加入这些后缀继续寻找文件）
        alias: {
            '@': path.join(__dirname, "./src"), // 在项目中使用@符号代替src路径，导入文件路径更方便
            // '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/utils/icons.js') //antd icon过大，在src/icons.js中引入要用到的icon
        }
    }
}