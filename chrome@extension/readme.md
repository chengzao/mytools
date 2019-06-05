#### `manifest.json` config

```js
{
  // 以下为必写
  "manifest_version": 2, // 必须为2，1号版本已弃用
  "name": "cliper", // 扩展程序名称
  "version": "0.01", // 版本号
  
  // 以下为选填
  
  // 推荐
  "description": "描述",
  "icons": {
    "16": "icons/icon_16.png",
    "48": "icons/icon_48.png",
    "64": "icons/icon_64.png",
    "128": "icons/icon_128.png"
  },
  "author": "ecmadao",
  
  // 根据自己使用的权限填写
  "permissions": [
    // 例如
    "tab",
    "storage",
    // 如果会在js中请求外域API或者资源，则要把外域链接加入
    "http://localhost:5000/*"
  ],
  
  // options_page，指右键点击右上角里的插件logo时，弹出列表中的“选项”是否可点，以及在可以点击时，左键点击后打开的页面
  "options_page": "view/options.html",
  
  // browser_action，左键点击右上角插件logo时，弹出的popup框。不填此项则点击logo不会有用
  "browser_action": {
    "default_icon": {
      "38": "icons/icon_38.png"
    },
    "default_popup": "view/popup.html", // popup页面，其实就是普通的html
    "default_title" : "保存到cliper"
  },
  
  // background，后台执行的文件，一般只需要指定js即可。会在浏览器打开后全局范围内后台运行
  "background": {
    "scripts": ["js/vendor/jquery-3.1.1.min.js", "js/background.js"],
    // persistent代表“是否持久”。如果是一个单纯的全局后台js，需要一直运行，则不需配置persistent（或者为true）。当配置为false时转变为事件js，依旧存在于后台，在需要时加载，空闲时卸载
    "persistent": false
  },
  
  // content_scripts，在各个浏览器页面里运行的文件，可以获取到当前页面的上下文DOM
  "content_scripts": [
    {
      // matches 匹配 content_scripts 可以在哪些页面运行
      "matches" : ["http://*/*", "https://*/*"],
      // js所定义的一个Array里的各个JS可以相互影响
      "js": ["js/vendor/jquery-3.1.1.min.js", "js/vendor/keyboard.min.js", "js/selection.js", "js/notification.js"],
      "css": ["css/notification.css"]
    }
  ]
}
```

#### `三种资源文件，针对着三个运行环境`

- `browser_action`

```
控制logo点击后出现的弹窗，涵盖相关的html/js/css
在弹窗中，会进行登录/注册的操作，并将用户信息保存在本地储存中。已登录用户则展现基本信息
里的资源会在弹窗打开时初始化，关闭时卸载
定义的JS/CSS运行环境仅限于popup，并且会在每次点开弹窗的时候初始化

browser_action的HTML文件里使用的JS，不能直接以<script></script>的形式行内写入HTML里，需要独立成JS文件再引入
如果有其他第三方依赖，比如jQuery等文件，也无法通过CDN引入，而需要保持资源文件到项目目录后再引入
```
- `background`

```
在后台持续运行，或者被事件唤醒后运行
右键菜单的点击和异步保存事件将在这里触发
推荐将background中的persistent设置为false，根据事件来运行后台js

什么时候会让background的资源文件加载呢?
应用程序第一次安装或者更新
监听某个事件触发(例如chrome.runtime.onInstalled.addListener)
监听其他环境的JS文件发送消息(例如chrome.runtime.onMessage.addListener)
扩展程序的其他资源文件调用了runtime.getBackgroundPage
```
- `content_scripts`

```
当前浏览的页面里运行的文件，可以操作DOM
因此，我会在这个文件里监听用户的选择事件
会在每个标签页初始化加载的时候进行调用，关闭页面时卸载
如果没有matches，则扩展程序无法正常加载
有js可以针对所有页面运行，则填写"matches" : ["http://*/*", "https://*/*"]
js所定义的一个Array里的各个JS可以相互影响
```

#### url
- `https://crxdoc-zh.appspot.com/extensions/runtime`
- `https://developer.chrome.com/extensions/runtime#event-onMessage`