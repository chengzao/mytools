const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
      {
          // js 文件才使用 babel
          test: /\.js$/,
          // 使用哪个 loader
          use: 'babel-loader',
          // 不包括路径
          exclude: /node_modules/
      },
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: 'inline-source-map',
  mode: "development",
  watch: true,
  watchOptions: { // 不监听目录
      ignored: [/node_modules/]
  },
  target: "web",
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 开发服务器配置
  devServer: {
      contentBase: 'dist',
      // contentBase: path.join(__dirname, "./dist"),
      host: "localhost",
      port: 8002,
      open: true,
      hot: true,
      compress: true, // 服务器返回给浏览器的时候是否启动gzip压缩
      hotOnly: true,

      /* inline模式开启服务器*/
      inline: true,
      openPage: "index.html", // 默认打开的页面
      clientLogLevel: "none"
  }
};