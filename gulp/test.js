// 从package中读取config.port
// 运行 npm run test1 
console.log(process.env.npm_package_config_port)
console.log(process.argv.slice(2))
console.log(process.env.NODE_ENV)