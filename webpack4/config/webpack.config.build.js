const path = require("path");
const glob = require("glob");
// 打包前清空输出目录
const CleanWebpackPlugin = require("clean-webpack-plugin");
// 压缩JS
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
// CSS单独提取出来加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const autoprefixer = require("autoprefixer");

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
        rules: [
            {
                test: /\.css$/,
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
                    "happypack/loader?id=css"
                ],
                exclude: /node_modules/
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "happypack/loader?id=scss"
                ],
                exclude: /node_modules/
            }
        ]
    },
    optimization: {
        minimizer: [
            new UglifyJSPlugin({
                cache: true,
                parallel: true,
                sourceMap: true // set to true if you want JS source maps
            }),
            new OptimizeCSSAssetsPlugin({})
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
        new HappyPack({
            id: "css",
            threadPool: happyThreadPool,
            loaders: [
                {
                    loader: "css-loader",
                    options: {
                        importLoaders: 1,
                        minimize: true,
                        sourceMap: false,
                        url: false
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
                }
            ]
        }),
        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.resolve(__dirname, "../src/tpl/*.html"))
        }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
        })
    ],
    mode: "production" // 模式配置
});
