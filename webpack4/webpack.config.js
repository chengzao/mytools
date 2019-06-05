// 获取
const argv = require("yargs").argv;

// console.log('argv ==> ',argv);

// 获取环境命令，并去除首尾空格
const parms = (argv.env).replace(/(\s*$)|(^\s*)/ig, "");

console.log("parms ==> ", parms);

module.exports = require(`./config/webpack.config.${parms}.js`);
