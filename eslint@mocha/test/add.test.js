/* eslint-disable */
var addNum=require("./../mocha-chai/add.js");
var expect = require('chai').expect;

describe("测试add.js", function() {
    describe("测试addNum函数", function() {
        it("两数相加结果为两个数字的和", function() {
            if(addNum(1,2)!==3){
                throw new Error("两数相加结果不为两个数字的和");
            }
        });
        it("两个数的和: chai - expect",function(){
            expect(addNum(1,2)).to.be.equal(3);
        })
    });
});

// mocha -t 5000 index.test.js
// mocha -2 1000 index.test.js
