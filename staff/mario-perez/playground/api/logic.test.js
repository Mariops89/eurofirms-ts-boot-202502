"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var logic_1 = require("./logic");
var data_1 = require("./data");
try {
    logic_1.default.registerUser('Peter Pan', "peter@pan.com", "peterpan", "123123123");
    console.log(data_1.default.users);
}
catch (error) {
    console.error(error);
}
try {
    logic_1.default.authenticateUser("peterpan", "123123123");
    console.log(data_1.default.users);
}
catch (error) {
    console.error(error);
}
