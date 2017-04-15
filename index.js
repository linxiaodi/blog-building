/*
* title  : create a static sever
* author : lwk
* time   : 2017-3-25
*/
let http = require('http');
let PORT = 7000;

let APP = require('./app/index')
let server = new APP();

let apiServer = require('./app/api-server')
let staticServer = require('./app/static-server/index');
let viewServer = require('./app/view-server/')

server.use(apiServer)
server.use(staticServer)
server.use(viewServer)

http.createServer(server.initSever()).listen(PORT,()=>{
    console.log('sever run~~~')
})