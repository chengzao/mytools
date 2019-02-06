const log = console.log.bind(console);

/// <reference path="modules/Validation.ts" />
/// <reference path="modules/LettersOnlyValidator.ts" />
/// <reference path="modules/ZipCodeValidator.ts" />

import {add} from "./showHello";
import $ from 'jquery';
import "./monent";
import "./base";
import "./variable";
import "./interface";
import "./class";
import "./function";
import "./generics";
import "./enum";
import "./other";
import "./Symbols";
import "./modules";
import "./node";
import "./namespace";
// import "./namespace-modules.js";
import "./myOtherModule";
import "./decorators";
import "./test";

document.writeln('import add(1,3) => '+ add(1,3) +'<br />');
document.writeln("$('#greeting').html() => "+ $('#greeting').html() +'<br />');
// log('add(1,3) ', add(1,3));
// log($('#greeting').html())