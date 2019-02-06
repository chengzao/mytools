/* eslint-disable */
import {assert} from "chai";
import addNum from "./../mocha-chai/add2";

describe('测试index.js',()=> {
    before(()=>console.info("在本区块的所有测试用例之前执行"))
  
    after(()=>console.info("在本区块的所有测试用例之后执行"))
  
    beforeEach(()=>console.info("在本区块的每个测试用例之前执行"))
  
    afterEach(()=>console.info("在本区块的每个测试用例之后执行"))
  
    describe('测试addNum函数', ()=> {
      it('两数相加结果为两个数字的和', ()=> {
        assert.equal(addNum(1,2),3)
      })
    })
  })