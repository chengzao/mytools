/// <reference path="./main.d.ts" />

// 最小值
console.log(Math.min.apply(Math,[1212,2,3]))
// 最大值
console.log(Math.max.apply(Math,[1212,2,3]))


let arr: number[] = [1,2,3];
let _arr = arr[Symbol.iterator]();

for(let i of _arr ){
    console.log(i);
}