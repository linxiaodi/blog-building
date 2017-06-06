'use strict';

var ejs = require('ejs');
var path = require('path');
var fs = require('fs');
var mime = require('mime');

var _require = require('./urlrewrite'),
    blog = _require.blog,
    market = _require.market;
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
                if (blog[pathname]) {
                    var basePath = path.resolve(__dirname, 'ejs');
                    var layoutPath = path.resolve(basePath, 'layout.ejs');
                    var layoutHtml = fs.readFileSync(layoutPath, 'utf8');
                    var render = ejs.compile(layoutHtml, {
                        filename: layoutPath
                    });
                    resCtx.body = render({
                        viewName: blog[pathname],
                        hasUser: resCtx.hasUser
                    });
                    resCtx.header = Object.assign(resCtx.header, {
                        'Content-Type': 'text/html'
                    });
                    resolve();
                } else {
                    //不需要ejs渲染
                    if (market[pathname]) {
                        var htmlPath = path.resolve(process.cwd(), './public' + market[pathname]);
                        fs.readFile(htmlPath, function (error, data) {
                            if (error) resCtx.body = 'NOT FOUND' + error.stack;
                            resCtx.body = data;
                            resolve();
                        });
                    } else {
                        Object.assign(resCtx.header, {
                            Location: '/'
                        });
                        resCtx.statusCode = 302;
                        resCtx.statusMsg = 'redirect';
                        resCtx.body = '';
                        resolve();
                    }
                    //重定向 
                }
            }
        }
    });
};