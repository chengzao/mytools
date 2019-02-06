### webpack

#### install 

- `touch webpack.config.js `
- `npm install --global webpack`
- `npm install --save-dev webpack`
- `npm install --save-dev webpack@<version>`

#### api

```
webpack打包，后面可以跟很多参数:
--progress: 打包进度
--display-modules: 打包的模块 
--colors: 是否彩色显示 打包提示信息
--display-reasons: 打包原因
--watch: 自动监控文件变化
```

#### use

```
 webpack index.js index.bundle.js
 webpack --help :  查看帮助
 webpack --config webpack.config.js : 启用配置文件
 webpack.config.js: 是webpack默认配置文件名
```

#### url

- [webpack中文](https://doc.webpack-china.org/guides/)
- [webpack：从入门到真实项目配置](https://juejin.im/post/59bb37fa6fb9a00a554f89d2)
- [webpack集](https://github.com/poetries/mywiki/wiki/webpack)
- [JSDoc](http://usejsdoc.org/index.html)