console.log("-------------enum------------------- ");
{
    // 数字枚举 : 默认从0开始
    enum Direction {
        Up = 1,
        Down,
        Left,
        Right
    }
    console.log(Direction.Down)

    enum Response {
        No = 0,
        Yes = 1,
    }
    
    function respond(recipient: string, message: Response): void {
        // ...
    }
    
    respond("Princess Caroline", Response.Yes)
}

{
    // 字符串枚举
    enum Direction {
        Up = "UP",
        Down = "DOWN",
        Left = "LEFT",
        Right = "RIGHT",
    }

    console.log(Direction.Up)
}
{
    // 异构枚举
    enum BooleanLikeHeterogeneousEnum {
        No = 0,
        Yes = "YES",
    }
}
{
    // 计算的和常量成员
    // E.X is constant:
    enum E { X }

    // All enum members in 'E1' and 'E2' are constant.
    enum E1 { X, Y, Z }
    enum E2 {
        A = 1, B, C
    }

    // 一个枚举表达式字面量（主要是字符串字面量或数字字面量）
    // 一个对之前定义的常量枚举成员的引用（可以是在不同的枚举类型中定义的）
    // 带括号的常量枚举表达式
    // 一元运算符 +, -, ~其中之一应用在了常量枚举表达式
    // 常量枚举表达式做为二元运算符 +, -, *, /, %, <<, >>, >>>, &, |, ^的操作对象
    // 若常数枚举表达式求值后为 NaN或 Infinity，则会在编译阶段报错
    enum FileAccess {
        // constant members
        None,
        Read    = 1 << 1,
        Write   = 1 << 2,
        ReadWrite  = Read | Write,
        // computed member
        G = "123".length
    }
    console.log(FileAccess.Read)
}

{
    // 联合枚举与枚举成员的类型
    enum ShapeKind {
        Circle,
        Square,
    }
    
    interface Circle {
        kind: number;
        radius: number;
    }
    
    interface Square {
        kind: ShapeKind.Square;
        sideLength: number;
    }
    
    let c: Circle = {
        kind: ShapeKind.Square,
        radius: 100,
    }
    console.log(c);
}