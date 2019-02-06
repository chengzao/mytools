const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: "production",
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, `./index.html`), // 指定产的HTML模板
      filename: `index.html`, // 产出的HTML文件名
      // title: `${page}`,
      chunks: ["manifest", "vendor", "common", `index`], // 在产出的HTML文件里引入哪些代码块
      hash: true, // 会在引入的js里加入查询字符串避免缓存,
      minify: {
          removeComments: true,
          collapseWhitespace: true
      },
      // date: new Date().toLocaleDateString(),
      inject: "body",
      chunksSortMode: "manual"
    }),
  ]
};