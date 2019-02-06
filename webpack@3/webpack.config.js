const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
// 把页面src引入文件的方式，改成用script标签嵌入的方式，减少http请求
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
module.exports = {
    // 入口文件
    entry: {
        index: './src/index.js',
        another: './src/js/other.js'
    },
    output: {
        //__dirname，就是当前webpack.config.js文件所在的绝对路径
        filename: 'js/[name].bundle.js', //输出路径，要用绝对路径
        path: path.resolve(__dirname, 'dist'), //打包之后输出的文件名
        // publicPath: './'
    },

    module: {
        rules: [
            // {
            //     test: /\.css$/,
            //     use:[
            //         'style-loader',
            //         { loader: 'css-loader', options: { modules: true, importLoaders: 1 } },
            //         'postcss-loader'
            //       ]
            // },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, 'postcss-loader']
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            // If you are having trouble with urls not resolving add this setting.
                            // See https://github.com/webpack-contrib/css-loader#url
                            url: false,
                            minimize: true,
                            sourceMap: true
                        }
                    }, {
                        loader: 'postcss-loader',
                        options: { sourceMap: true }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }]
                })
            },
            {
                // 图片格式正则
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                {
                    loader: 'url-loader',
                    // 配置 url-loader 的可选项
                    options: {
                        // 限制 图片大小 10000B，小于限制会将图片转换为 base64格式
                        limit: 10000,
                        // 超出限制，创建的文件格式
                        // build/images/[图片名].[hash].[图片格式]
                        name: 'images/[name].[hash].[ext]'
                    }
                }]
            },
            {
                // js 文件才使用 babel
                test: /\.js$/,
                // 使用哪个 loader
                use: 'babel-loader',
                // 不包括路径
                exclude: /node_modules/
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: ['file-loader']
            },
        ],

    },
    devtool: 'source-map',
    devServer: {
        contentBase: path.resolve(__dirname,'dist'),
        hot: true
      },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new HTMLWebpackPlugin({
            template: './template.html',
            title: 'Production',
            date: new Date().toLocaleDateString(),
            userName: 'chengzao',
            inject: true //有4个值: true | 'head' | 'body' | false
        }),
        new HTMLWebpackPlugin({
            template: './template.html',
            title: 'test',
            filename: 'list.html',
            date: new Date().toLocaleDateString(),
            userName: 'test',
            inlineSource: '.(js|css)$',
            excludeChunks: ['another']
        }),
        new HtmlWebpackInlineSourcePlugin(),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'common', // 指定公共 bundle 的名称。
            filename: 'js/common.js',
            minChunks: Infinity
        }),
        new ExtractTextPlugin({
            filename: (getPath) => {
                return getPath('css/[name].css').replace('css/js', 'css');
            },
            allChunks: true
        }),
        // 压缩提取出的 CSS，并解决ExtractTextPlugin分离出的 JS 重复问题
        new OptimizeCSSPlugin({
            assetNameRegExp: /\.optimize\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        }),
        // 压缩 JS 代码
        new UglifyJSPlugin({
            sourceMap: true
        }),
        // 生成全局变量
        new webpack.DefinePlugin({
            'process.env': { 'NODE_ENV': JSON.stringify('production') }
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
};