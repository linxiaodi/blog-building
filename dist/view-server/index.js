'use strict';

var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

var urlrewrite = require('./urlrewrite');
/*
 *  HTML加载中间件 
 */
module.exports = function (ctx) {
    var req = ctx.req,
        resCtx = ctx.resCtx;
    var pathname = ctx.reqCtx.pathname;

    return Promise.resolve({
        then: function then(resolve, reject) {

            if (pathname.match('action') || pathname.match(/\./)) {
                resolve();
            } else {
                if (urlrewrite[pathname]) {
                    var basePath = path.resolve(__dirname, 'ejs');
                    var layoutPath = path.resolve(basePath, 'layout.ejs');
                    var layoutHtml = fs.readFileSync(layoutPath, 'utf8');
                    var render = ejs.compile(layoutHtml, {
                        filename: layoutPath
                    });
                    resCtx.body = render({
                        viewName: urlrewrite[pathname],
                        hasUser: resCtx.hasUser
                    });
                    resCtx.header = Object.assign(resCtx.header, {
                        'Content-Type': 'text/html'
                    });
                    resolve();
                } else {
                    //重定向
                    Object.assign(resCtx.header, {
                        Location: '/'
                    });
                    resCtx.statusCode = 302;
                    resCtx.statusMsg = 'redirect';
                    resCtx.body = '';
                    resolve();
                }
            }
        }
    });
};