// create web server
// to run: node comments.js
// to test: curl -X POST -d "author=Scott&text=This is my comment" http://localhost:3000/comments
// to test: curl http://localhost:3000/comments
// to test: curl -X DELETE http://localhost:3000/comments/2
// to test: curl -X PUT -d "author=Scott&text=This is my comment" http://localhost:3000/comments/2
// to test: curl -X POST -d "author=Scott&text=This is my comment" http://localhost:3000/comments
// to test: curl -X POST -d "author=Scott&text=This is my comment" http://localhost:3000/comments
// to test: curl -X POST -d "author=Scott&text=This is my comment" http://localhost:3000/comments

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var comments = [{author: 'Scott', text: 'This is my comment'}];