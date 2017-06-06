'use strict';

var cookieMod = require('cookie');
var whiteNameLis = ['/lwk'];
module.exports = function (ctx) {
    var pathname = ctx.reqCtx.pathname;
    var cookie = ctx.req.headers.cookie;
    var res = ctx.res;

    var cookieObj = void 0;
    if (cookie) cookieObj = cookieMod.parse(cookie);
    return Promise.resolve({
        then: function then(resolve, reject) {
            var cookieStr = function cookieStr(t) {
                return 'name=lwk;Max-Age=' + t;
            };
            if (whiteNameLis.indexOf(pathname) >= 0) {
                res.setHeader('Set-Cookie', cookieStr(3600));
            }
            if (cookie && cookieObj['name']) {
                ctx.resCtx.hasUser = true;
            }
            if (pathname === '/logout') {
                ctx.resCtx.hasUser = false;
                res.setHeader('Set-Cookie', cookieStr(0));
            }
            resolve();
        }
    });
};