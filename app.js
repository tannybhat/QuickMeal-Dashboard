/**
 * http://usejsdoc.org/
 */
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var index = require('./routes/index');
var app = express();
var mongoose = require('mongoose');
var mongo = require('mongodb');
//var tableau = require('tableau-api');

mongoose.connect('mongodb://localhost:27017/nodetest1')
var db = mongoose.connection;

//View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(express.static(path.join(__dirname, 'public')));
app.use(session( {secret: "String for encrypting cookies." } ));

app.use(cookieParser());

// app.use(function(req, res, next) {
//     req.db = db;
//     next();
// });

app.use('/', index);

module.exports = app;
app.listen(3000);