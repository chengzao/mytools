console.log("-------------interface------------------- ");
{
    interface LabelledValue {
        label: string;
      }
      
      function printLabel(labelledObj: LabelledValue) {
        console.log(labelledObj.label);
      }
      
      let myObj = {size: 10, label: "Size 10 Object"};
      printLabel(myObj);
}

{
    // 在属性名字定义的后面加一个?符号,表示可选
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    function createSquare(config: SquareConfig): {color: string; area: number} {
        let newSquare = {color: "white", area: 100};
        if (config.color) {
            newSquare.color = config.color;
        }
        if (config.width) {
            newSquare.area = config.width * config.width;
        }
        return newSquare;
    }
    let mySquare = createSquare({color: "black"});  
    console.log(mySquare);
    mySquare = createSquare({color: "black",width:20}); 
    console.log(mySquare);
}

{
    // 在属性名字定义的后面加一个?符号,表示可选
    interface SquareConfig {
        color?: string;
        width?: number;
    }

    // let test = createSquare({opacity: "black",width:20}); // opacity error

    // 类型断言
    let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
    console.log(mySquare);
}

{   
    interface SquareConfig {
        color?: string;
        width?: number;
        [propName: string]: any;
    }
    // 类型断言
    let squareOptions = { colour: "red", width: 100 };
    let mySquare = createSquare(squareOptions);
    console.log(mySquare);
}

{
    // readonly表示只读
    interface Point{
        readonly x:number;
        readonly y:number;
    }
    let p1: Point = { x: 10, y: 20 };
    // p1.x = 5; // error!
}

{
    // ReadonlyArray 数组只读
    let a: number[] = [1, 2, 3, 4];
    let ro: ReadonlyArray<number> = a;
    // ro[0] = 12; // error!
    // a = ro;

    // 用类型断言重写
    let b = ro as number[];
    b[1] = 12;
    console.log(b);
}

{
    console.log("-------------函数类型接口------------------")
    // 函数类型
    interface SearchFunc {
        (source: string, subString: string): boolean;
    }
    let mySearch: SearchFunc;
    mySearch = function(source: string, subString: string) {
        let result = source.search(subString);
        return result > -1;
    }
    console.log(mySearch('abc','d'));

    // 
    let mySearch2 = function(source: string, subString: string):boolean {
        let result = source.search(subString);
        return result > -1;
    }
    console.log(mySearch2('abc','d'));

    // 
    let mySearch3: SearchFunc;
    mySearch3 = function(src, sub) {
        let result = src.search(sub);
        return result > -1;
    }
    console.log(mySearch3('abc','d'));
}

{
    //可索引的类型
    interface StringArray {
        [index: number]: string;
    }
      
    let myArray: StringArray;
    myArray = ["Bob", "Fred"];
    console.log(myArray);
    let myStr: string = myArray[0];
    console.log(myStr);
}

{
    interface NumberDictionary {
        readonly [index: number]: string;
        length: number; 
        name: string;       
    }
    let myArray: NumberDictionary;
    myArray = {1:'hel',name:'wo',length:2};
    console.log(myArray);
}

{
    // 类类型 implements
    interface ClockConstructor {
        new (hour: number, minute: number): ClockInterface;
    }
    interface ClockInterface {
        tick();
    }
    function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
        return new ctor(hour, minute);
    }
    class DigitalClock implements ClockInterface {
        m: number;
        constructor(public h: number, m: number) {
            this.h = h;
            this.m = m;
         }
        tick() {
            console.log("beep beep",this.h,this.m);
        }
    }
    class AnalogClock implements ClockInterface {
        constructor(public h: number,public m: number) { 
            this.h = h;
            this.m = m;
        }
        tick() {
            console.log("tick tock",this.h,this.m);
        }
    }
    
    let digital = createClock(DigitalClock, 12, 17);
    let analog = createClock(AnalogClock, 7, 32);

    digital.tick()
    analog.tick()
}
{
    interface Loggable {
        log(): void;
    }
    class ConsoleLogger implements Loggable {
        log() {
            console.log('this is log');
        }
    }
    let ad = new ConsoleLogger();
    ad.log();
}

{
    // 继承接口
    interface Shape {
        color: string;
    }
    
    interface Square extends Shape {
        sideLength: number;
    }
    
    let square = <Square>{};
    square.color = "blue";
    square.sideLength = 10;
    console.log(square)
}

{
    interface Counter {
        (start: number): string;
        interval: number;
        reset(): void;
    }
    
    function getCounter(): Counter {
       let counter = (<Counter>function (start: number) {
           console.log('start')
           return 'srart 2';
        });
        counter.interval = 123;
        counter.reset = function () { 
            console.log('reset')
        };
        return counter;
    }
    
    let c = getCounter();
    console.log( c(10))
    console.log(c.interval);
    c.reset()
}