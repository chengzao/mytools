/// <reference path="node.d.ts"/>
import * as URL from "url";
let myUrl = URL.parse("http://www.typescriptlang.org");
console.log('-----------外部模块----------');
console.log('myUrl => ',myUrl);