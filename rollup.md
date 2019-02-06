### rollup
#### install
- `npm install rollup --global `
- `npm install rollup --save-dev `

#### use

- `touch rollup.config.js `
- `rollup --help `
- `rollup src/main.js -o bundle.js -f cjs `
- `rollup -c rollup.config.js `
- `rollup -c rollup.config.js  -o bundle-2.js `
- `parcel build entry.js --out-dir build/output --public-url ./`

#### output.format

```
amd – 异步模块定义，用于像RequireJS这样的模块加载器
cjs – CommonJS，适用于 Node 和 Browserify/Webpack
es – 将软件包保存为ES模块文件
iife – 一个自动执行的功能，适合作为<script>标签。（如果要为应用程序创建一个捆绑包，您可能想要使用它，因为它会使文件大小变小。）
umd – 通用模块定义，以amd，cjs 和 iife 为一体
```

#### url
- [rollup.js](https://rollupjs.org/guide/en)
- [rollup.js中文1](http://www.rollupjs.com/big-list-of-options/)
- [rollup.js中文2](https://rollupjs.cn/)