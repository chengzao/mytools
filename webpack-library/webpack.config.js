const path = require('path')

module.exports = {
  entry: "./src/index.js",
  mode: "production",
  output:{
    path: path.resolve(__dirname, "dist"),
    filename: "library.js",
    library:"library",
    libraryTarget: "umd"
  },
  externals: ['lodash'] // 不打包
}
