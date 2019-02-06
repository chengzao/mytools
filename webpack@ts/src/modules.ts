import { StringValidator } from "./lib/Validation";
import { mainValidator } from "./lib/ZipCodeValidator";
import { LettersOnlyValidator } from "./lib/LettersOnlyValidator";

// Some samples to try
let strings = ["Hello", "98052", "101"];

// Validators to use
let validators: { [s: string]: StringValidator; } = {};
validators["ZIP code"] = new mainValidator();
validators["Letters only"] = new LettersOnlyValidator();

console.log("-------------modules------------------");

// Show whether each string passed each validator
strings.forEach(s => {
    for (let name in validators) {
        console.log(`"${ s }" - ${ validators[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
    }
});
