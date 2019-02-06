console.log("-------------function------------------- ");
{
    // 为函数定义类型
    let myAdd = function(x: number, y: number): number { return x + y; };
}
{
    // 完整函数类型
    let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
    console.log(myAdd(1,2))
}

{
    let buildName = function (firstName: string, lastName: string) : string {
        return firstName + " " + lastName;
    }
    let result3 = buildName("Bob", "Adams");
}

{
    // 可选参数
    let  buildName = function (firstName: string, lastName?: string) {
        if (lastName)
            return firstName + " " + lastName;
        else
            return firstName;
    }

}

{
    // 初始化参数
    let buildName = function (firstName: string, lastName = "Smith") {
        return firstName + " " + lastName;
    }
}

{
    // 剩余参数
    let buildName =function (firstName: string, ...restOfName: string[]) {
        return firstName + " " + restOfName.join(" ");
      }
      
      let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
}

{
    // 默认参数
    function addNum(x:number,y:number = 3):void{
        console.log(x+y);
    }
    addNum(1);
    addNum(1,4);
}

{
    // this
    let deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        createCardPicker: function() {
            // NOTE: the line below is now an arrow function, allowing us to capture 'this' right here
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

{
    interface Card {
        suit: string;
        card: number;
    }
    interface Deck {
        suits: string[];
        cards: number[];
        createCardPicker(this: Deck): () => Card;
    }
    let deck: Deck = {
        suits: ["hearts", "spades", "clubs", "diamonds"],
        cards: Array(52),
        // NOTE: The function now explicitly specifies that its callee must be of type Deck
        createCardPicker: function(this: Deck) {
            return () => {
                let pickedCard = Math.floor(Math.random() * 52);
                let pickedSuit = Math.floor(pickedCard / 13);
    
                return {suit: this.suits[pickedSuit], card: pickedCard % 13};
            }
        }
    }
    
    let cardPicker = deck.createCardPicker();
    let pickedCard = cardPicker();
    
    console.log("card: " + pickedCard.card + " of " + pickedCard.suit);
}

{
    let suits = ["hearts", "spades", "clubs", "diamonds"];
    console.log("-------------function 重载------------------- ");
    function pickCard(x: {suit: string; card: number; }[]): number;
    function pickCard(x: number): {suit: string; card: number; };
    function pickCard(x): any {
        // Check to see if we're working with an object/array
        // if so, they gave us the deck and we'll pick the card
        if (typeof x == "object") {
            let pickedCard = Math.floor(Math.random() * x.length);
            return pickedCard;
        }
        // Otherwise just let them pick the card
        else if (typeof x == "number") {
            let pickedSuit = Math.floor(x / 13);
            return { suit: suits[pickedSuit], card: x % 13 };
        }
    }

    let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
    let pickedCard1 = myDeck[pickCard(myDeck)];
    console.log("card: " + pickedCard1.card + " of " + pickedCard1.suit);

    let pickedCard2 = pickCard(15);
    console.log("card: " + pickedCard2.card + " of " + pickedCard2.suit);
}

{
    interface player {
        run():void;
        socre():number;
    }
    
    function createPlay():player{
        return {
            run (){},
            socre(){return 12}
        }
    }
    
    let player1 = createPlay();
    console.log(player1.socre())
}

{
    function clone<T>(value:T):T{
        let serialized = JSON.stringify(value);
        return JSON.parse(serialized);
    }
    console.log(clone('hello'));
}
{
    var num1:Array<number> = [1,2,3]
    var num2:number[]= [4,5,6]

    class KeyValuePair<Tkey , Tval>{
        constructor(public key:Tkey , public val:Tval){

        }

    }
    let pair1 = new KeyValuePair(1,3);
    let pair2 = new KeyValuePair<number , string>(1,"abc");
    let pair4 = new KeyValuePair<number , string>(1,"def");
    let pair3 = new KeyValuePair<number , Date>(1,new Date());

    class KeyValuePair2<T,U> {
        constructor(private pairs: KeyValuePair<T, U>[]){

        }
        print(){
            for(let p of this.pairs){
                console.log(`${p.val}`);
            }
        }
    }

    let p = new KeyValuePair2([pair2,pair4]);
    p.print();
}
