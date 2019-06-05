module.exports = {
    // 指定解析器
    "parser": "babel-eslint",
    // 指定脚本的运行环境
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    // 别人可以直接使用你配置好的ESLint
    "root": true,
    "extends": "eslint:recommended",
    // 脚本在执行期间访问的额外的全局变量
    "globals": {
        "var1": true,
        "var2": false,
        "$":false,
        'Vue': true,
        'VueRouter': true
    },
    // 指定解析器选项
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true,
            "impliedStrict":true,
            "globalReturn":true
        }
    },
    // 启用的规则及其各自的错误级别
    "rules": {
        "indent": [
            "error",
            4
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "warn",
            {"allow":["warn", "error"]}
        ],
        "no-eval": 2, //禁用 eval
        "no-unused-vars": 1,
        "consistent-this": [2, "_this", "that"],
        "no-dupe-args":2,
        // new关键字后类名应首字母大写
        "new-cap": [2, {
            "capIsNew": false, // 允许大写开头的函数直接执行
        }],
        // new 关键字后类应包含圆括号
        "new-parens": 2,
        "default-case": 2
    },
    // 第三方插件
    "plugins":[]
}