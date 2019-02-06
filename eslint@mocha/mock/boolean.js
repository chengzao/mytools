var Mock = require("mockjs");

function fn() {
    return Math.ceil(Math.random() * 10);
}

var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    "list|2": [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        "id|+1": 1,
        "isFalse|1": true,
        "isTrue|1-4": true,
        "fn": fn
    }],
    "object": [{
        "obj1|1-2": {
            "name|1-2": "xiao",
            "age|10-20": 1
        },
        "obj2|1": {
            "name|1-2": "xiao",
            "age|10-20": 1
        },
    }],
    "array": [{
        "arr|1": [2, 3, 4],
        "arr2|+1": [2, 3, 4],
        "arr3|1-2": [7, 8, 9],
        "arr4|2": [5, 6],
    }],
    "regexp": [{
        "regexp1": /[a-z][A-Z][0-9]/,
        "regexp2": /\w\W\s\S\d\D/,
        "regexp3": /\d{5,10}/
    }],
    "NANE": {
        "first": "@FIRST",
        "middle": "@FIRST",
        "last": "@LAST",
        "full": "@first @middle @last"
    }
});
// 输出结果
console.log(JSON.stringify(data, null, 4));