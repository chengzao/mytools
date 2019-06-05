import { sayHello } from "./greet";

function add(x:number,y:number){
    return x+y;
}

let myAdd = function(x:number,y:number):number {
    return x + y
  } 

// console.log('I am in funtion.ts' ,myAdd(2,3) )

document.writeln('I am in funtion.ts => ' + myAdd(2,3).valueOf() +'<br />')

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}
showHello("greeting", "TypeScript2.7");


export {add}