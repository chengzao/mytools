let fs =require('fs');
let glob = require('glob');

//获取入口文件对象,返回对象
function getEntry(file_list){
  var entry={};
  file_list.forEach((item)=>{
      entry[item[0].split('.').slice(0,-1).join('.')]=item[2]
  })
  return entry;
}

//递归遍历所有文件,返回数组
function getAllFileArr(path){
    var AllFileList=[];
    getAllFile(path)
    function getAllFile(path) {
        var files = [];
        if( fs.existsSync(path) ) {   //是否存在此路径
            files = fs.readdirSync(path);
            files.forEach(function(file,index){
                var curPath = path + "/" + file;
                if(fs.statSync(curPath).isDirectory()) { // recurse 查看文件是否是文件夹
                    getAllFile(curPath);
                } else {
                    if(file!=='.DS_Store'){
                        AllFileList.push([file,path,curPath])
                    }
                }
            });
        }
    };
    return AllFileList;
}

//删除文件夹 ，递归删除
function deleteFolder(path) {
    var files = [];
    if( fs.existsSync(path) ) {
        files = fs.readdirSync(path);
        files.forEach(function(file,index){
            var curPath = path + "/" + file;
            if(fs.statSync(curPath).isDirectory()) { // recurse 查看文件是否是文件夹
                deleteFolder(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

function getFiles(path){
    var entries = {};
    glob.sync(path).forEach(function(entry) {
        // var pathname = entry.split('/').splice(-2).join('-').split('.')[0];
        var pathname = entry.split('/').splice(-1)[0].split('.')[0];
        entries[pathname] = entry;
    });
    // console.log(entries)
    return entries;
}

module.exports = {
    getEntry,
    getAllFileArr,
    deleteFolder,
    getFiles
}