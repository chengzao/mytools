var Mock = require("mockjs");
var template = {
    name: "value1"
};
var data = {
    name: "value2"
};
// 校验真实数据 data 是否与数据模板 template 匹配
// template : 表示数据模板，可以是对象或字符串
// data: 表示真实数据
var res = Mock.valid(template, data);

console.log(res);