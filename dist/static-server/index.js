'use strict';

var fs = require('fs');
var path = require('path');

function getUrl(pathname) {
    var pathnameHeader = './public';
    return path.resolve(process.cwd(), pathnameHeader + pathname);
}
var mime = require('mime');

function init(ctx) {

    return new Promise(function (resolve, reject) {
        var urlMap = {
            '/favicon.ico': '/index.html'
        };
        var pathname = ctx.reqCtx.pathname;
        var resCtx = ctx.resCtx;

        if (!pathname.match('action') && pathname.match(/\./)) {
            //判断是否为ajax请求
            //这里我们请求静态资源
            pathname = urlMap[pathname] || pathname;
            Object.assign(resCtx.header, {
                'Contene-Type': mime.lookup(pathname)
            });
            pathname = getUrl(pathname);
            fs.readFile(pathname, function (error, data) {
                if (error) resCtx.body = 'NOT FOUND' + error.stack;
                resCtx.body = data;
                resolve();
            });
        } else {
            resolve();
        }
    });
}
module.exports = init;