let smallImg = document.createElement("img");
// 必须 require 进来
smallImg.src = require("../images/webpack.svg");
document.body.appendChild(smallImg);

let bigImg = document.createElement("img");
bigImg.src = require("../images/big.jpg");
document.body.appendChild(bigImg);
