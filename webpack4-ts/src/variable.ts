// 函数声明 var let const
console.log("-------------var let const------------------- ");
{
    // 数组解构
    let input = [1, 2];
    let [first, second] = input;
    console.log(first); // outputs 1
    console.log(second); // outputs 2

    // swap variables
    [first, second] = [second, first];
    console.log(first); // outputs 2
    console.log(second); // outputs 1

    // function
    function fn([first, second]: number[]) {
        console.log(first);
        console.log(second);
    }
    fn([3,4]);

    // ...
    let [a, ...rest] = [1, 2, 3, 4];
    console.log(a); // outputs 1
    console.log(rest); // outputs [ 2, 3, 4 ]

    let [b] = [1, 2, 3, 4];
    console.log(b); // outputs 1

    let [, v, , m] = [1, 2, 3, 4];
    console.log(v,m)
}

{
    // 对象解构
    let o = {
        a: "foo",
        b: 12,
        c: "bar"
    };
    let { a, b } = o;
    console.log(a,b);
    ({ a, b } = { a: "baz", b: 101 });
    console.log(a,b);

    let { c, ...passthrough } = o;
    console.log(c,passthrough)

    // 属性重命名
    let { a: newName1, b: newName2 } = o;
    console.log(newName1,newName2);

    {   // 判断类型
        let {a, b}: {a: string, b: number} = o;
        console.log(a,b);
    }
}

{
    // 默认值
    function add(obj:{a:string,b?:number}){
        let {a,b=100} = obj;
        console.log(a,b);
    }
    add({a:'a'});
    add({a:'a',b:2});

    // 函数声明 
    //type:类型别名
    type C = {a:string,v?:number};
    function func(obj: C):void{
        let {a,v = 100} = obj;
        console.log(a,v);
    }
    func({a:"a"})
    func({a:"a",v:12})

    // 函数表达式
    let f = function ({ a, b = 0 } = { a:'abc'}): void {
        console.log('f => ',a,b);
    }
    f()
    
    // 
    let f2 = function ({ a, b = 0 } : { a:string ,b?:number}): void {
        console.log('f2 => ',a,b);
    }
    f2({a:'d'})
}

{
    // 展开
    let first = [1, 2];
    let second = [3, 4];
    let bothPlus = [0, ...first, ...second, 5];
    console.log(bothPlus)

    let defaults = { food: "spicy", price: "$$", ambiance: "noisy" };
    let search = { ...defaults, food: "rich" };
    console.log(defaults)


    class C {
        p = 12;
        m() {
        }
      }
      let c = new C();
      let clone = { ...c };
      console.log(clone)
      clone.p; // ok
      // clone.m(); // error!
}