console.log("-------------class------------------- ");
{
    class Animal{
        public greeting: string;
        constructor (message:string){
            if(new.target === Animal){
               // console.log('Animal => ',new.target);
               throw Error('本类不能实例化'); 
            }
            this.greeting = message;
        }
        greet(){
            return 'Hello, ' + this.greeting; 
        }
    }
    // 继承
    class Dog extends Animal {
        constructor (message:string){
            // console.log('Dog => ',new.target)
            super(message);
        }
        bark() {
            console.log('Woof! Woof!',this.greeting);
        }
    }

    // let greeter = new Animal("world");
    // console.log(greeter.greet())
    const dog = new Dog('dog');
    dog.bark()
}

{
    // private
    class Animal{
        public name : string;
        private age: number;
        protected user: string; // 可以在派生类中使用
        protected readonly sex: string; // 只读属性
        static address: string = 'BJ China';
        constructor (n:string,a:number){
            this.name = n;
            this.age = a;
            this.sex = 'boy';
            this.user = 'xioa ming';
        }
        getName():void{
            console.log(this.name,this.age, Animal.address);
        }
    }
    class Rhino extends Animal {
        constructor(name:string,age:number) { super(name,age); }
        getName(): void{
            console.log('Rhino ',this.user , this.name , this.sex,Animal.address)
        }
    }

    let dog = new Animal('xiao',12,);
    dog.getName();
    console.log(dog.name)
    // console.log(dog.age) // error

    let rhino = new Rhino("Rhino",14);
    rhino.getName()
}

{
    // 参数属性
    class Animal {
        constructor(private name: string) { }
        move(distanceInMeters: number) {
            console.log(`${this.name} moved ${distanceInMeters}m.`);
        }
    }
}

{
    let passcode = "secret passcode";
    class Employee {
        private _fullName: string;
    
        get fullName(): string {
            return this._fullName;
        }
    
        set fullName(newName: string) {
            if (passcode && passcode == "secret passcode") {
                this._fullName = newName;
            }
            else {
                console.log("Error: Unauthorized update of employee!");
            }
        }
    }
    
    let employee = new Employee();
    employee.fullName = "Bob Smith";
}


{
    // 抽象类
    abstract class Animal {
        constructor(public name:string,private age:number){
            this.name = name;
            this.age = age;
        }
        abstract makeSound(): void;  // 必须在派生类中实现
        move(): void {
            console.log('roaming the earch...');
        }
    }
    class Dog extends Animal{
        constructor(name:string,age:number){
            super(name,age) // 在派生类的构造函数中必须调用 super()
        }
        makeSound(){
            console.log('this is dog name is',this.name);
        }
    }

    let dog = new Dog('tom',12);
    dog.move();
    dog.makeSound();

    let department: Animal;
    department = new Dog('jane',14);
    department.move();
}

{
    class Greeter {
        greeting: string;
        constructor(message: string) {
            this.greeting = message;
        }
        greet() {
            return "Hello, " + this.greeting;
        }
    }
    
    let greeter: Greeter; // Greeter类的实例的类型是 Greeter
    greeter = new Greeter("world");
    console.log(greeter.greet());
}

{
    class Greeter {
        static standardGreeting = "Hello, there";
        greet() {
           return Greeter.standardGreeting;
        }
    }
    
    let greeter1: Greeter;
    greeter1 = new Greeter();
    console.log(greeter1.greet());
    
    let greeterMaker: typeof Greeter = Greeter;
    greeterMaker.standardGreeting = "Hey there!";
    let greeter2: Greeter = new greeterMaker();
    console.log(greeter2.greet());
}

{
    // 把类当做接口使用
    class Point {
        x: number;
        y: number;
    }
    
    interface Point3d extends Point {
        z: number;
    }
    
    let point3d: Point3d = {x: 1, y: 2, z: 3};
    console.log(point3d)
}

{
    // Mixin 模式的实现
    function mix(...mixins) {
        class Mix {}
        for (let mixin of mixins) {
          copyProperties(Mix.prototype, mixin); // 拷贝实例属性
          copyProperties(Mix.prototype, Reflect.getPrototypeOf(mixin)); // 拷贝原型属性
        }
        return Mix;
    }
    function copyProperties(target, source) {
        for (let key of Reflect.ownKeys(source)) {
            if ( key !== "constructor"
            && key !== "prototype"
            && key !== "name"
            ) {
            let desc = Object.getOwnPropertyDescriptor(source, key);
            Object.defineProperty(target, key, desc);
            }
        }
    }

    // class DistributedEdit extends mix(Loggable, Serializable) {
    //     // ...
    // }
}