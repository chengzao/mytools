/// <reference path="modules/Validation.ts" />
/// <reference path="modules/LettersOnlyValidator.ts" />
/// <reference path="modules/ZipCodeValidator.ts" />

// 执行
// tsc --outFile src/namespace-modules.js src/modules-namespace.ts
// https://www.tslang.cn/docs/handbook/namespaces.html

console.log('-------------namespace-modules------------')

{
    // Some samples to try
    let strings2 = ["Hello", "98052", "101"];

    // Validators to use
    let validators2: { [s: string]: Validations.StringValidator; } = {};
    validators2["ZIP code"] = new Validations.ZipCodeValidator();
    validators2["Letters only"] = new Validations.LettersOnlyValidator();

    // Show whether each string passed each validator
    for (let s of strings2) {
        for (let name in validators2) {
            console.log(`"${ s }" - ${ validators2[name].isAcceptable(s) ? "matches" : "does not match" } ${ name }`);
        }
    }
}