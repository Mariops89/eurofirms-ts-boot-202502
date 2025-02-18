"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var data = {
    uuid: function () {
        return (Date.now() + Math.random()).toString(36).replace('.', '');
    },
    users: [],
    posts: []
};
exports.default = data;
