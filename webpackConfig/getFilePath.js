const fs = require("fs");


module.exports = function getFilePath(path){
    let fileArr = [];
    let existpath = fs.existsSync(path); 
    if(existpath){
        let readdirSync = fs.readdirSync(path);
        readdirSync.map((item)=>{
            let currentPath = path + "/" + item;
            let isDirector = fs.statSync(currentPath).isDirectory();
            if(isDirector && item !== "component"){
                fileArr.push(item);
            }
        });
        return fileArr;
    }
};