console.log("-------------Symbol------------------- ");
{
    let sym1 = Symbol();

    let sym2 = Symbol("key"); // 可选的字符串key
}

{
    let sym2 = Symbol("key");
    let sym3 = Symbol("key");

    sym2 === sym3; // false, symbols是唯一的
}
// {
//     let sym = Symbol();
//     let obj = {
//         [sym]: "value"
//     };
//     console.log(obj[sym]); // "value"
// }
{
    const getClassNameSymbol = Symbol();

    class C {
        [getClassNameSymbol](){
        return "C";
        }
    }

    let c = new C();
    let className = c[getClassNameSymbol](); // "C"
}