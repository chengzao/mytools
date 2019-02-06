const log = console.log.bind(console);
console.log("-------------base------------------- ");
{
    //布尔值 boolean
    let isDone: boolean = false;
    let createdByNewBoolean: Boolean = new Boolean(1);
    let createdByBoolean: boolean = Boolean(1);
    document.write('isDone => ' + isDone + '<br />')
    document.write('createdByNewBoolean => ' + createdByNewBoolean + '<br />')
    document.write('createdByBoolean => ' + createdByBoolean + '<br />')
}

{
    // 字符串 string 、 数字 number
    let name: string = `Gene`;
    let age: number = 37;
    let sentence: string = `Hello, my name is ${ name }
        I'll be ${ age + 1 } years old next month.`;
    document.write(sentence + "<br />");
}

{
    // 数组 Array
    let list: number[] = [1, 2, 3];
    let list2: Array < number > = [4, 5, 6];
    let strList = list.map(String);
    let strList2 = list2.map(String);
    document.write('list => ' + strList + '<br />')
    document.write('list2 => ' + strList2 + '<br />')
}

{
    // 元组 Tuple
    let x: [string, number, boolean];
    x = ['hello', 1, false];
    log(x);
    log(x[0].substr(1))
    // log(x[1].substr(1)) // error
    // 联合类型
    x[3] = 'world';
    log(x);
    x[4] = null;
    x[5] = undefined;
    log(x);
    // x[6] = [] //error
}

{
    // 枚举 enum : 对JavaScript标准数据类型的一个补充
    enum Color {
        Red,
        Green,
        Blue
    }
    let c: Color = Color.Green;
    log(c); // 1
    enum Color2 {
        Red = 2, Green, Blue = 4
    }
    let c2: Color2 = Color2.Blue;
    let c3: Color2 = Color2.Green;
    log(c2, c3);
}

{
    // Any
    let notSure: any = 4;
    log(notSure.toFixed(2))
    notSure = "maybe a string instead";
    log(notSure)
    notSure = false; // okay, definitely a boolean
    log(notSure)
    let list: any[] = [1, true, "free"];
    list[1] = 100;
    log(list);
}

{
    // Void : 它表示没有任何类型 
    // 当一个函数没有返回值时，你通常会见到其返回值类型是 void
    function warnUser(): void {
        log("This is my warning message");
    }
    warnUser();

    // 声明一个void类型的变量没有什么用，为它赋予undefined和null
    let unusable: void = undefined;
    log(unusable);
}

{
    // Null 和 Undefined : 默认情况下null和undefined是所有类型的子类型
    // 可以把 null和undefined赋值给number类型的变量
    // 当你指定了--strictNullChecks标记，null和undefined只能赋值给void和它们各自

    let u: undefined = undefined;
    let n: null = null;
    log(u,n);
}

{
    // 联合类型
    // 当你想传入一个 string或null或undefined，
    // 你可以使用联合类型string | null | undefined

    let str: string | null | undefined;
    str = '1';
    str = null;
    str = undefined;
    // str = []
}

{
    // never : 表示的是那些永不存在的值的类
    // never类型是任何类型的子类型，也可以赋值给任何类型

    function err(message:string): never{
        throw new Error(message);
    }
    // err('error');
}

{
    // 类型断言
    let someValue: any = "this is a string";

    let strLen0: number = someValue.length;
    log(strLen0);


    let strLen: number = (<string>someValue).length;
    log(strLen);

    let strLen2: number = (someValue as string).length;
    log(strLen2)
}