const HtmlWebpackPlugin = require("html-webpack-plugin");
const getFilePath = require("./getFilePath");
let htmlArr = [];


getFilePath("./src/modules").map((item)=>{
    htmlArr.push(new HtmlWebpackPlugin({
        chunks:[`${item}`],
        template:`./src/modules/${item}/index.html`,
        filename:`${item}/index.html`,
    }));
});


module.exports = htmlArr;