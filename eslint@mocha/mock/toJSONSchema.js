var Mock = require("mockjs");
var template = {
    "key|1-10": "★"
};

// 把 Mock.js 风格的数据模板 template 转换成 JSON Schema
// JSON Schema: http://json-schema.org/
// template: 表示数据模板，可以是对象或字符串
var res = Mock.toJSONSchema(template);

console.log(res);