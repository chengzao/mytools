/// <reference path="Validation.ts" />
var Validations;
(function (Validations) {
    var lettersRegexp = /^[A-Za-z]+$/;
    var LettersOnlyValidator = /** @class */ (function () {
        function LettersOnlyValidator() {
        }
        LettersOnlyValidator.prototype.isAcceptable = function (s) {
            return lettersRegexp.test(s);
        };
        return LettersOnlyValidator;
    }());
    Validations.LettersOnlyValidator = LettersOnlyValidator;
})(Validations || (Validations = {}));
/// <reference path="Validation.ts" />
var Validations;
(function (Validations) {
    var numberRegexp = /^[0-9]+$/;
    var ZipCodeValidator = /** @class */ (function () {
        function ZipCodeValidator() {
        }
        ZipCodeValidator.prototype.isAcceptable = function (s) {
            return s.length === 5 && numberRegexp.test(s);
        };
        return ZipCodeValidator;
    }());
    Validations.ZipCodeValidator = ZipCodeValidator;
})(Validations || (Validations = {}));
/// <reference path="modules/Validation.ts" />
/// <reference path="modules/LettersOnlyValidator.ts" />
/// <reference path="modules/ZipCodeValidator.ts" />
console.log('-------------namespace-modules------------');
{
    // Some samples to try
    var strings2 = ["Hello", "98052", "101"];
    // Validators to use
    var validators2 = {};
    validators2["ZIP code"] = new Validations.ZipCodeValidator();
    validators2["Letters only"] = new Validations.LettersOnlyValidator();
    // Show whether each string passed each validator
    for (var _i = 0, strings2_1 = strings2; _i < strings2_1.length; _i++) {
        var s = strings2_1[_i];
        for (var name_1 in validators2) {
            console.log("\"" + s + "\" - " + (validators2[name_1].isAcceptable(s) ? "matches" : "does not match") + " " + name_1);
        }
    }
}
