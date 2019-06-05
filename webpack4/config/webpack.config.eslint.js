const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack"); // 引入happypack
const os = require("os"); // 获取cpu
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// CSS单独提取出来加载
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const webpackBase = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackBase, {
    // 处理对应模块
    module: {
        rules: [
            {
                test: /\.css$/, // 解析css
                // use: ['style-loader', 'css-loader'] // 从右向左解析
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                        options: {
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, "postcss-loader"]
                }),
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "happypack/loader?id=css"
                }),
                exclude: /node_modules/
            },
            {
                test: /\.js$/,
                // 强制先进行 ESLint 检查
                enforce: "pre",
                // 不对 node_modules 和 lib 文件夹中的代码进行检查
                exclude: /node_modules|lib/,
                loader: "eslint-loader",
                options: {
                    // 启用自动修复
                    fix: true,
                    // 启用警告信息
                    emitWarning: true
                }
            }
        ]
    },
    watch: true,
    watchOptions: { // 不监听目录
        ignored: [/node_modules/]
    },
    target: "web",
    // 对应的插件
    plugins: [
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new HappyPack({
            id: "css",
            verbose: true,
            threadPool: happyThreadPool,
            loaders: [
                {loader: "css-loader", options: {importLoaders: 1, minimize: true, sourceMap: true}},
                {loader: "postcss-loader", options: { sourceMap: true }},
                {loader: "sass-loader", options: { sourceMap: true }}
            ]

        }),
        new ExtractTextPlugin({
            filename: (getPath) => getPath("css/[name].css").replace("css/js", "css"),
            allChunks: true
        })
    ],
    // 开发服务器配置
    devServer: {
        // contentBase: 'dist',
        contentBase: path.join(__dirname, "../dist"),
        host: "localhost",
        port: 8000,
        open: true,
        hot: true,
        compress: true, // 服务器返回给浏览器的时候是否启动gzip压缩
        hotOnly: true,

        /* inline模式开启服务器*/
        // inline: true,
        openPage: "index.html", // 默认打开的页面
        clientLogLevel: "none"
    },
    devtool: "source-map",
    mode: "development" // 模式配置
});

