const path = require('path');
const merge = require('webpack-merge');
// 引入通用webpack配置文件
const common = require('./webpack.common.js');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 对js代码进行混淆压缩的插件
const uglifyJSPlugin = new UglifyJSPlugin();

// 对babel的配置，内容同.babelrc文件
const babelOptions = {
  "presets": [
    ["env", {
      "targets": {
        "browsers": ["last 2 versions", "safari >= 7"]
      }
    }]
  ]
}
module.exports = merge(common, {
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
          options: babelOptions
        },
        {
          loader: 'ts-loader'
        }
      ]
    }]},
  devtool: 'cheap-module-source-map',
  plugins: [
    uglifyJSPlugin,
  ],
  // 设置出口文件地址与文件名
  output: {
    path: path.resolve('dist'),
    filename: 'bundle.min.js'
  },
});