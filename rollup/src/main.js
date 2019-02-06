import foo from './foo.js';
import test from './test.js'
import { version } from '../package.json';
import answer from 'the-answer';
import _ from 'lodash';
import { ajax } from 'jquery';
import { count, increment } from './incrementer.js';
import { selectAll } from 'd3';


const VER = "1.0.2";
let query = "rollup";

selectAll('p').style('color', 'purple');

console.log('test',test);

ajax( 'https://api.github.com?search=' + query ).then( function(res){
  console.log(res)
} );

console.log(count); // 0
increment();
console.log(count); // 1


export default () => {
    console.log('VER',VER);
    console.log('foo',foo);
    console.log('version',version);
    console.log(`the answer is ${answer}`);
    console.log(_.chunk(['a', 'b', 'c', 'd'], 3));
  }