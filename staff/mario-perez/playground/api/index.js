"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var peter = { id: "abc-123", name: "Peter Pan", email: "peter@pan.com", username: "peterpan", password: "123123123" };
var wendy = { id: "def-456", name: "Wendy Darling", email: "wendy@darling.com", username: "wendydarling", password: "123123123" };
var pepito = { id: "ghi-789", name: "Pepito Grillo", email: "pepito@grillo.com", username: "pepitogrillo", password: "123123123" };
var campa = { id: "jkl-012", name: "Campa Nilla", email: "campa@nilla.com", username: "campanilla", password: "123123123" };
var post1 = { id: "mno-345", author: "abc-123", image: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExemFoZHNoYWg2amZ0a3c2aTlhNXVndWpyMTk0bDEzaTRwZ2hyNTdjcCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/cHDi1qNyDvRUA/giphy.gif", text: "taking a nap", date: new Date() };
//const users: Array<User> = []
var users = [];
var posts = [];
users.push(peter);
users.push(wendy);
users.push(pepito);
users.push(campa);
posts.push(post1);
console.table(users);
console.table(posts);
