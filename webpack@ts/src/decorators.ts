console.log(' ------------ 装饰器组合 ----------------')
function f() {
    console.log("f(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("f(): called");
    }
}

function g() {
    console.log("g(): evaluated");
    return function (target, propertyKey: string, descriptor: PropertyDescriptor) {
        console.log("g(): called");
    }
}

class C {
    @f()
    @g()
    method() {}
}
console.log(' ------------ 方法装饰器 ----------------')
{
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
    
        @enumerable(false)
        @loginfo()
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    function enumerable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.enumerable = value;
        };
    }
    function loginfo() {
        return function (target:any, propertyKey: string, descriptor: PropertyDescriptor) {
            // console.log(propertyKey,descriptor,'log...')
           console.log('This is property log...')     
        }
    }
    let greeter = new Greeter('This is Greeter');
    console.log(greeter.greet());
}
console.log(' ------------ 构造函数装饰器 ----------------')
{
    @sealed
    @log2
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    function sealed(constructor: Function) {
        Object.seal(constructor);
        Object.seal(constructor.prototype);
    }
    function log2(constructor: Function) {
        console.log('This is Class log2..')
    }
    let greeter = new Greeter('This is Greeter');
    console.log(greeter.greet());
}
console.log(' ------------ 重载构造函数 ----------------')
{
    function classDecorator<T extends {new(...args:any[]):{}}>(constructor:T) {
        return class extends constructor {
            newProperty = "new property";
            hello = "override";
        }
    }
    
    @classDecorator
    class Greeter {
        property = "property";
        hello: string;
        constructor(m: string) {
            this.hello = m;
        }
    }
    
    console.log(new Greeter("world"));

    interface IHaveAlength {
        length: number;
    }

    function totalLen<T extends IHaveAlength>(x:T,y:T):number{
        var total: number = x.length + y.length;
        return total;
    }

    let _len = totalLen('Hello',"Typescript");
    console.log('totalLen ',_len);
}
console.log(' ------------ 访问器装饰器 ----------------')

{
    class Point {
        private _x: number;
        private _y: number;
        constructor(x: number, y: number) {
            this._x = x;
            this._y = y;
        }
    
        @configurable(false)
        get x() { return this._x; }
    
        @configurable(false)
        get y() { return this._y; }
    }
    function configurable(value: boolean) {
        return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
            descriptor.configurable = value;
        };
    }
    let point = new Point(12,23);
    console.log(point.x)
}

console.log(' ------------ 属性装饰器 ----------------')
import "reflect-metadata";
{
    const formatMetadataKey = Symbol("format");

    function format(formatString: string) {
        return Reflect.metadata(formatMetadataKey, formatString);
    }

    function getFormat(target: any, propertyKey: string) {
        return Reflect.getMetadata(formatMetadataKey, target, propertyKey);
    }
    class Greeter {
        @format("Hello, %s")
        greeting: string;
    
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            let formatString = getFormat(this, "greeting");
            return formatString.replace("%s", this.greeting);
        }
    }
    let greeter = new Greeter('This is Greeter');
    console.log(greeter.greet());
}
