 const merge = require('webpack-merge');
 const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
 const common = require('./webpack.common.js');
 const webpack = require('webpack');
 // 文件映射
 const ManifestPlugin = require('webpack-manifest-plugin');
 module.exports = merge(common, {
   devtool: 'source-map',
   plugins: [
     // new UglifyJSPlugin()
        new UglifyJSPlugin({
          sourceMap: true
        }),
        new ManifestPlugin(),
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        })
   ]
 });
