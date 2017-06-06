/*
* title  : create a static sever
* author : lwk
* time   : 2017-3-25
*/
let http = require('http');
let PORT = 7000;

let APP = require('./app/index')
let server = new APP();

let cookieParser = require('./app/cookie-parser/')
let apiServer = require('./app/api-server')
let staticServer = require('./app/static-server/index');
let viewServer = require('./app/view-server/')
let urlParser = require('./app/url-parse/')

server.use(urlParser)
server.use(cookieParser)
server.use(apiServer)
server.use(staticServer)
server.use(viewServer)
//启动mongoose连接mongodb
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog');
mongoose.connection.on('error',()=>{console.log(`db connect fail`)})
mongoose.connection.once('open',()=>{console.log(`db connect successfully`)})


http.createServer(server.initSever()).listen(PORT,()=>{
    console.log('sever run~~~')
})