const path = require("path");
const webpack = require("webpack");
const HappyPack = require("happypack"); // 引入happypack
const os = require("os"); // 获取cpu
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

// CSS单独提取出来加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const webpackBase = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");

module.exports = webpackMerge(webpackBase, {
    // 处理对应模块
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // only enable hot in development
                            hmr: process.env.NODE_ENV === "development",
                            // if hmr does not work, this is a forceful method.
                            reloadAll: true
                        }
                    },
                    "happypack/loader?id=scss"
                ],
                exclude: /node_modules/
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
            id: "scss",
            verbose: true,
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: true
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        plugins: (loader) => [
                            autoprefixer()
                        ],
                        sourceMap: false
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
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
        inline: true,
        openPage: "index.html", // 默认打开的页面
        clientLogLevel: "none"
    },
    devtool: "eval",
    mode: "development" // 模式配置
});

