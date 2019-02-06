console.log("-------------generics 泛型------------------- ");
// 泛型
{
    // 使用泛型变量
    function identity<T>(arg: T): T {
        return arg;
    }

    console.log(identity([]))
    console.log(identity({}))

    let loggingIdentity1 = function <T>(arg: T[]): T[] {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }

    loggingIdentity1([1,2,3])

    function loggingIdentity2<T>(arg: Array<T>): Array<T> {
        console.log(arg.length);  // Array has a .length, so no more error
        return arg;
    }
}

{
    // 使用泛型变量
    function identity1<T>(arg: T): T {
        return arg;
    }
    
    let myIdentity: <T>(arg: T) => T = identity;
}

{
    // 泛型类型
    interface GenericIdentityFn {
        <T>(arg: T): T;
    }
    
    interface GenericIdentityFn2<T> {
        (arg: T): T;
    }
    
    let identity = function <T>(arg: T): T {
        return arg;
    }
    
    let myIdentity: GenericIdentityFn = identity;
}

{
    // 泛型类型
    interface GenericIdentityFn<T> {
        (arg: T): T;
    }
    
    function identity2<T>(arg: T): T {
        return arg;
    }
    
    let myIdentity: GenericIdentityFn<number> = identity;

}

{
    // 泛型类使用（ <>）括起泛型类型，跟在类名后面
    class GenericNumber<T> {
        zeroValue: T;
        add: (x: T, y: T) => T;
    }
    
    let myGenericNumber = new GenericNumber<number>();
    myGenericNumber.zeroValue = 0;
    myGenericNumber.add = function(x, y) { return x + y; };

    let stringNumeric = new GenericNumber<string>();
    stringNumeric.zeroValue = "";
    stringNumeric.add = function(x, y) { return x + y; };

    console.log(stringNumeric.add(stringNumeric.zeroValue, "test"));
}
