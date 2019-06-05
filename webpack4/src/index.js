// var sum = require('./js/main.js')
// console.log(sum(3, 2))

// es6
import add from "./js/main.js";
import "./css/index.css";
import "./scss/main.scss";
import "./js/add_image.js";
import "./common/common";
// 引入别名
import test from "@util/util";

console.log(test);

console.log(add(12, 1));

// 获取全局变量
console.log(process.env.NODE_ENV);


if (module.hot) {
    module.hot.accept();
}
