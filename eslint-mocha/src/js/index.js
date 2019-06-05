const fetch = require("node-fetch");
let a = "test";

// var2 = "aaaa";

var1 = "aaa";

// var3 = "1111";

let set  = new Set();

set.add("1").add(1).add(2).add(2);

console.log(set);


// console.log(a);


// https://juejin.im/entry/5a7836ed6fb9a0635f7e59e4

let list = fetch("http://localhost:3000/comments/2");
list.then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));


// async
let fn  = async function (params) {
    let list = await fetch("http://localhost:3000/comments/2");
    return list.json();
};

fn().then(res => console.log(res));

