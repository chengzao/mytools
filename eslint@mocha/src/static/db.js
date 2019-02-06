let user = require("./data/user.js");
let list = require("./data/list.js");

Object.assign(list,user);

module.exports = {
    list
};