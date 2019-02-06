import json from 'rollup-plugin-json';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import path from 'path';
const version = 'v1.0.1';
export default {
    // 输入
    input: 'src/main.js',
    // 指出应将哪些模块视为外部模块,不会与你的库打包在一起
    external: ['lodash','jquery',path.resolve( './src/test.js')],
    // 生成包名称
    output: {
      file: 'dist/bundle.js',
      format: 'iife', // amd , cjs , es , iife , umd
      name: 'MyBundle', //生成包名称,代表你的 iife/umd 包，同一页上的其他脚本可以访问它 
      paths: {
        d3: 'https://d3js.org/d3.v5.min.js'
      }
    },
    watch:{
      include: 'src/**',
      exclude: 'node_modules/**'
    },
    plugins:[json(),resolve({
      // 将自定义选项传递给解析插件
      customResolveOptions: {
        moduleDirectory: 'node_modules'
      }
    }),commonjs(),
    babel({
      exclude: 'node_modules/**' // 只编译我们的源代码
    })],
    // 全局模块
    globals: {
      jquery: '$'
    },
    sourcemap: true,
    intro: 'var ENVIRONMENT = "production";',
    // 前置/追加 到文件束(bundle)
    banner: '/* my library version ' + version + ' */',
    footer: '/* follow me on github! @chengzao */',
    // 将拦截警告信息。如果没有提供，警告将被复制并打印到控制台
    onwarn ({loc, frame, message }) {
      if (loc) {
        console.warn(`${loc.file} (${loc.line}:${loc.column}) ${message}`);
        if (frame) console.warn(frame);
      } else {
        console.warn(message);
      }
      
    }
  }