// https://segmentfault.com/a/1190000009464850

let axios = require("axios");
let MockAdapter = require("axios-mock-adapter");
let mock1 = require("mockjs");
// 首先创建一个实例，设置模拟调试器实例 
var Mock = new MockAdapter(axios);
// 创建mock数据模板
let template = {
    "list|1-10": [{
        "id|+1": 1,
        //属性 guid 是唯一机器码
        "guid": "@guid",
        //属性 id 是随机id
        "id": "@id",
        //属性 title 是一个随机长度的标题
        "title": "@title()",
        //属性 paragraph 是一个随机长度的段落
        "paragraph": "@cparagraph",
        //属性 image 是一个随机图片 参数分别为size, background, text
        "image": "@image('200x100', '#4A7BF7', 'Hello')",
        //属性 address 是一个随机地址
        "address": "@county(true)",
        //属性 date 是一个yyyy-MM-dd 的随机日期
        "date": "@date(\"yyyy-MM-dd\")",
        //属性 time 是一个 size, background, text 的随机时间
        "time": "@time(\"HH:mm:ss\")",
        //属性 url 是一个随机的url
        "url": "@url",
        //属性 email 是一个随机email
        "email": "@email",
        //属性 ip 是一个随机ip
        "ip": "@ip",
        //属性 regexp 是一个正则表达式匹配到的值 如aA1
        "regexp": /[a-z][A-Z][0-9]/,
    }]
};
// 生成数据
let mockData=  mock1.mock(template);

// 模拟任意GET请求到 /users 
// reply的参数为 (status, data, headers)
Mock.onGet("/users").reply(200, mockData);

// 
axios.get("/users")
    .then(function(response) {
        console.log(response.data);
    });

// Mock.mock(/\.json/, {
//     "list|1-10": [{
//         "id|+1": 1,
//         //属性 guid 是唯一机器码
//         "guid": "@guid",
//         //属性 id 是随机id
//         "id": "@id",
//         //属性 title 是一个随机长度的标题
//         "title": "@title()",
//         //属性 paragraph 是一个随机长度的段落
//         "paragraph": "@cparagraph",
//         //属性 image 是一个随机图片 参数分别为size, background, text
//         "image": "@image('200x100', '#4A7BF7', 'Hello')",
//         //属性 address 是一个随机地址
//         "address": "@county(true)",
//         //属性 date 是一个yyyy-MM-dd 的随机日期
//         "date": "@date(\"yyyy-MM-dd\")",
//         //属性 time 是一个 size, background, text 的随机时间
//         "time": "@time(\"HH:mm:ss\")",
//         //属性 url 是一个随机的url
//         "url": "@url",
//         //属性 email 是一个随机email
//         "email": "@email",
//         //属性 ip 是一个随机ip
//         "ip": "@ip",
//         //属性 regexp 是一个正则表达式匹配到的值 如aA1
//         "regexp": /[a-z][A-Z][0-9]/,
//     }]
// });
// axios.get("hello.json", {
//     responseType: "json"
// })
//     .then(function (response) {
//         console.log("step1 =>", response);
//     })
//     .catch(function (error) {
//         console.log(error);
//     });