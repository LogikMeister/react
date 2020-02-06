const getFilePath = require("./getFilePath");


module.exports = function getEnty(path){
    let entry = {};
    getFilePath(path).map((item)=>{
        entry[`${item}`] = `${path}/${item}/index.js`;
    });
    entry['app'] = './src/index.js';
    return entry;
};