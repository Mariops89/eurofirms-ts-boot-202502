"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data_1 = require("./data");
var errors_1 = require("./errors");
var logic = {
    registerUser: function (name, email, username, password) {
        var user = data_1.default.users.find(function (user) { return user.email === email || user.username === username; });
        if (user)
            throw new errors_1.DuplicityError('user already exists');
        user = {
            id: data_1.default.uuid(),
            name: name,
            email: email,
            username: username,
            password: password
        };
        data_1.default.users.push(user);
    },
    authenticateUser: function (username, password) {
        var user = data_1.default.users.find(function (user) { return user.username === username; });
        if (!user || user.password !== password) {
            throw new errors_1.CredentialsError('Wrong credentials');
        }
        return user.id;
    }
};
exports.default = logic;
