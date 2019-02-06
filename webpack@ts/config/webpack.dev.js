const path = require('path');
const webpack = require("webpack");
let HtmlWebpackPlugin = require("html-webpack-plugin");
const common = require('./webpack.common.js');

module.exports = merge(common, {
  output: {
    filename: "index.bundle.js",
    path: path.resolve("dist")
  },
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

  devtool: 'inline-source-map',
  mode: "development",
  watch: true,
  watchOptions: { // 不监听目录
      ignored: [/node_modules/]
  },
  target: "web",
  plugins: [
    // HtmlWebpackPlugin
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    // 分离
    new webpack.optimize.SplitChunksPlugin({
        chunks: "initial",
        cacheGroups: {
            default: {
                minChunks: 2,
                priority: -20,
                reuseExistingChunk: true
            },
            // 打包重复出现的代码
            vendor: {
                chunks: "initial",
                minChunks: 2,
                maxInitialRequests: 5, // The default limit is too small to showcase the effect
                minSize: 0, // This is example is too small to create commons chunks
                name: "vendor"
            },
            // 打包第三方类库
            commons: {
                name: "commons",
                chunks: "initial",
                minChunks: Infinity
            }
        }
    }),
    // 用于固定模块id 防止调整顺序对于id进行重新打包
    new webpack.HashedModuleIdsPlugin(),
    // 提升作用域
    new webpack.optimize.ModuleConcatenationPlugin(),
  ],
  devServer: {
      contentBase: './dist',
      // contentBase: path.join(__dirname, "../dist"),
      host: "localhost",
      port: 8000,
      open: true,
      hot: true,
      compress: true, // 服务器返回给浏览器的时候是否启动gzip压缩
      hotOnly: true,

      /* inline模式开启服务器*/
      inline: true,
      openPage: "index.html", // 默认打开的页面
      clientLogLevel: "none"
  },
});