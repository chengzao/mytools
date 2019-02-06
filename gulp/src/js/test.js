// export var something = true;
// export let test  = 'abcd';


const NUM = 1;
const VER = '1.0.1';
var VERSION;
function ab(v){
    console.log('ab',v)
}


let obj = {
    'name': 'xiaoming'
}

export {
    NUM,
    VER as VERSION,
    ab,
    obj
}

export default i => i;

console.log('test js ....')