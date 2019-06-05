/* eslint-disable */
import {assert} from "chai";
import addNum from "./../mocha-chai/add2";

describe("测试add2.js",()=> {
    describe("测试addNum函数", ()=> {
        it("es6为两个数字的和", ()=> {
            assert.equal(addNum(1,2),3);
        });
    });
});