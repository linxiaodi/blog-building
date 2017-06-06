'use strict';

/*
* title  : create a static sever
* author : lwk
* time   : 2017-3-25
*/
var http = require('http');
var PORT = 7000;

var APP = require('./dist/index');
var server = new APP();

var cookieParser = require('./dist/cookie-parser/');
var apiServer = require('./dist/api-server');
var staticServer = require('./dist/static-server/index');
var viewServer = require('./dist/view-server/');
var urlParser = require('./dist/url-parse/');

server.use(urlParser);
server.use(cookieParser);
server.use(apiServer);
server.use(staticServer);
server.use(viewServer);
//启动mongoose连接mongodb
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog');
mongoose.connection.on('error', function () {
    console.log('db connect fail');
});
mongoose.connection.once('open', function () {
    console.log('db connect successfully');
});

http.createServer(server.initSever()).listen(PORT, function () {
    console.log('sever run~~~');
});
