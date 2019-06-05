const path = require('path');
const glob = require('glob');
// 插件都是一个类，所以我们命名的时候尽量用大写开头
let HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 打包前清空输出目录
const CleanWebpackPlugin = require('clean-webpack-plugin');
// 拷贝静态资源
const CopyWebpackPlugin = require('copy-webpack-plugin');
// 压缩JS
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const HappyPack = require('happypack') //引入happypack
const os = require('os'); //获取cpu
const happyThreadPool = HappyPack.ThreadPool({size: os.cpus().length});

//css treeShaking
const PurifyCSSPlugin = require('purifycss-webpack');

// CSS单独提取出来加载
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");


let lib = require('./config/lib.js');
let baseConfig = require('./config/config.js');

let obj = lib.getFiles('./src/*.js');

let entries = {};

// 通过 html-webpack-plugin 生成的 HTML 集合
let HTMLPlugins = [];


//单独抽离不会变化的第三方库
const _common = {
	'common': baseConfig.common
}

for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
        const element = obj[key];
        // console.log(element)
        entries[key] = element;
    }
}
// HtmlWebpackPlugin
for (const page of Object.keys(entries)) {
    let config = {
        template: `./src/tpl/${page}.html`, //指定产的HTML模板
        filename: `${page}.html`, //产出的HTML文件名
        chunks: ['manifest', 'vendor','common', `${page}`], //在产出的HTML文件里引入哪些代码块
        hash: true, // 会在引入的js里加入查询字符串避免缓存,
        minify: {
            removeComments: true,
            collapseWhitespace: true
        },
        inject: 'body',
        chunksSortMode: 'manual' 
    };
    HTMLPlugins.push(new HtmlWebpackPlugin(config));
    entries[page] = path.resolve(__dirname, `./src/${page}.js`)
}

module.exports = {
    // 入口文件
    entry: Object.assign(entries, _common),
    // 出口文件
    output: {
        filename: 'js/[name].[hash:4].bundle.js',
        path: path.resolve('dist')
    },
    resolve: {
        //引入模块的时候，可以不用扩展名 
        extensions: [".js", ".scss", ".json"],
        alias: {
            imageBase: './src/images'
        }
    },
    // 处理对应模块
    module: {
        rules: [
            // {
            //     test: /\.s?[ac]ss$/,
            //     use: [
            //         MiniCssExtractPlugin.loader,
            //         'css-loader',
            //         'postcss-loader',
            //         'sass-loader'
            //       ],
            //     exclude: /node_modules/ 
            // },
            {
                test: /\.scss$/,
                loaders: [
                  MiniCssExtractPlugin.loader,
                  'happypack/loader?id=scss',
                ]
              },
              {
                test: /\.css$/,
                loaders: [
                  MiniCssExtractPlugin.loader,
                  'happypack/loader?id=css',
                ]
              },
            {
				test: /\.html$/, //匹配所有html文件
				use: ['html-loader'],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			},
            {
				test: /\.js$/, //匹配所有css文件
				use: [
                    {loader: 'babel-loader?cacheDirectory=true'}, //编译es6
                ],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配
			},
            {
				test: /\.(gif|png|jpe?g|svg)(\?.*)?$/i,
				use: [
					{
						loader: 'url-loader',
						options: {
							name: '[name]-[hash:6].[ext]',
							outputPath: 'images/',
							limit: 10000,
							// publicPath: '../images' // 所以是基于page文件夹进行相对定位 要设置publicPath绝对路径
						}
					},
					{
						loader: 'image-webpack-loader',
						//压缩图片
						options: {
							pngquant: {
								quality: '65-90',
								speed: 4
							},
						}
					}
				],
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配

            },
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: '[name:6].[ext]',
					outputPath: 'fonts/',
					publicPath: '../fonts' //同理 所以是基于page文件夹进行相对定位 要设置publicPath绝对路径
				},
				exclude: /node_modules/ //excluder排除怼node下的文件的匹配

            },
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
        new CleanWebpackPlugin('dist'),
        ...HTMLPlugins,
        new HappyPack({
			id: 'js',
			loaders: ['babel-loader?cacheDirectory=true'],
			threadPool: happyThreadPool,
			// cache: true,
			verbose: true
        }),
        new HappyPack({
            id: 'scss',
            threadPool: happyThreadPool,
            loaders: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  indent: 'postcss',
                  plugins: (loader) => [
                    require('autoprefixer')()
                  ],
                  sourceMap: false
                }
              },
              {
                loader: 'sass-loader',
                options: {
                  sourceMap: false
                }
              }
            ]
          }),
          new HappyPack({
            id: 'css',
            threadPool: happyThreadPool,
            loaders: [
              {
                loader: 'css-loader',
                options: {
                  minimize: true,
                  sourceMap: false
                }
              },
              {
                loader: 'postcss-loader',
                options: {
                  plugins: (loader) => [
                    require('autoprefixer')()
                  ],
                  sourceMap: false
                }
              }
            ]
          }),

        new PurifyCSSPlugin({
            // Give paths to parse for rules. These should be absolute!
            paths: glob.sync(path.join(__dirname, 'src/tpl/*.html')),
          }),
        new MiniCssExtractPlugin({
            filename: "css/[name].css",
            chunkFilename: "css/[id].css"
          }),

        new webpack.HotModuleReplacementPlugin(),
        
        new webpack.optimize.SplitChunksPlugin({
            chunks: 'initial',
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true,
				},
				//打包重复出现的代码
				vendor: {
					chunks: 'initial',
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0, // This is example is too small to create commons chunks
					name: 'vendor'
				},
				//打包第三方类库
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: Infinity
				}
			}
		}),

		new webpack.optimize.RuntimeChunkPlugin({
			name: "manifest"
        }),
        //用于固定模块id 防止调整顺序对于id进行重新打包
        new webpack.HashedModuleIdsPlugin(),

		//提升作用域
		new webpack.optimize.ModuleConcatenationPlugin(),

		//压缩代码并且进行没又实用代码的去除 tree shrinking
		new UglifyJSPlugin({
			parallel: true,
		}), //开启多线程进行打包


		//复制文件
		new CopyWebpackPlugin([
			{
				from: path.resolve(__dirname, './src/lib/libCss/mui.min.css'),
				to: path.resolve(__dirname, './dist/lib/libCss'),
				force: true
			}
        ]),

		new webpack.BannerPlugin('Hello , I am webpack@4!'),
    ],
    // 开发服务器配置
    devServer: {
        contentBase: './dist',
        host: 'localhost',
        port: 8000,
        open: true,
        compress: true, //服务器返回给浏览器的时候是否启动gzip压缩
    },
    mode: "development" // 模式配置
}

