var Mock = require("mockjs");
var Random = Mock.Random;
// Mock.Random 是一个工具类，用于生成各种随机数据

Random.email();
// => "n.clark@miller.io"

// Mock.Random 的方法在数据模板中称为『占位符』，书写格式为 @占位符(参数 [, 参数])
Mock.mock("@email");
// => "y.lee@lewis.org"
Mock.mock( { email: "@email" } );
// => { email: "v.lewis@hall.gov" }

console.log(Random.color());

// ------------   ------------

// Mock.Random 提供的完整方法（占位符）
// https://github.com/nuysoft/Mock/wiki/Mock.Random

// Type	Method
// Basic	boolean, natural, integer, float, character, string, range, date, time, datetime, now
// Image	image, dataImage
// Color	color
// Text	paragraph, sentence, word, title, cparagraph, csentence, cword, ctitle
// Name	first, last, name, cfirst, clast, cname
// Web	url, domain, email, ip, tld
// Address	area, region
// Helper	capitalize, upper, lower, pick, shuffle
// Miscellaneous	guid, id