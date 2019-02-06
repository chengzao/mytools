function getRefreshTime(el){
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth()+1;
	var day = date.getDate();
	var hour = date.getHours();
	var minute = date.getMinutes();
	var second = date.getSeconds();

	document.getElementById(el).innerHTML = '网页最后刷新于：'+year+'年'+month+'月'+day+'日 '+hour+':'+minute+':'+second;
}
getRefreshTime('time');
console.log('js...');


const aaaaa = 'hahahahahah';
console.log(aaaaa);

// import {something,test} from './test.js';
// console.log('from test.js',something,test);

import {NUM as num , ab , VERSION, obj} from './test.js';
console.log('import',num , VERSION, obj)
ab('hello');

import b from './test.js';
console.log('import',b(233))

import './a.js';


// import { area, circumference } from './b.js';
// console.log('圆面积：' + area(4));
// console.log('圆周长：' + circumference(14));

import * as circle  from './b.js';

console.log(circle)
console.log('圆面积：' + circle.area(4));
console.log('圆周长：' + circle.circumference(14));