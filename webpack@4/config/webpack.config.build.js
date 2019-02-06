const path = require("path");
const glob = require("glob");
// 打包前清空输出目录
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 压缩JS
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// CSS单独提取出来加载
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const HappyPack = require("happypack"); // 引入happypack
const os = require("os"); // 获取cpu
const happyThreadPool = HappyPack.ThreadPool({
    size: os.cpus().length
});

// css treeShaking
const PurifyCSSPlugin = require("purifycss-webpack");


const webpackBase = require("./webpack.config.base");
const webpackMerge = require("webpack-merge");


module.exports = webpackMerge(webpackBase, {
    // 处理对应模块
    module: {
        rules: [{
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
        }
        ]
    },
    // 对应的插件
    plugins: [
        new CleanWebpackPlugin(["dist"], // 这里指每次清除dist文件夹的文件 匹配的文件夹
            {
                root: `${__dirname}/../`, // 制定插件根目录位置 TODO 好恶心啊这种写法
                // verbose: true, //开启控制台输出
                dry: false // 启用删除文件
            }),
        new HappyPack({
            id: "css",
            verbose: true,
            threadPool: happyThreadPool,
            loaders: [{
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
                    sourceMap: true
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
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.resolve(__dirname, "../src/tpl/*.html"))
        }),
        new ExtractTextPlugin({
            filename: (getPath) => getPath("css/[name].css").replace("css/js", "css"),
            allChunks: true
        }),
        // 压缩代码并且进行没又实用代码的去除 tree shrinking
        new UglifyJSPlugin({
            parallel: true
        }) // 开启多线程进行打包
    ],
    mode: "production" // 模式配置
});
