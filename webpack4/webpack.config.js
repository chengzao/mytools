// 获取
const argv = require("yargs").argv;

// 获取环境命令，并去除首尾空格
const parms = (argv.env).replace(/(\s*$)|(^\s*)/ig, "");

console.log(`\n argv.env parms : ${parms}`);
console.log(`require file : ./config/webpack.config.${parms}.js \n`);

module.exports = require(`./config/webpack.config.${parms}.js`);
