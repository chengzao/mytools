var Mock = require("mockjs");
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|1-10": [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        "number1|1-100.1-10": 1,
        "number2|123.1-10": 1,
        "number3|123.3": 1,
        "number4|123.10": 1.123
    }]
});
// 输出结果
console.log(JSON.stringify(data, null, 4));