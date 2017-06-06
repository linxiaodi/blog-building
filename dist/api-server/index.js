'use strict';

var Router = require('./ajax');

module.exports = function (ctx) {
    var reqCtx = ctx.reqCtx,
        resCtx = ctx.resCtx;
    var pathname = reqCtx.pathname;

    return Promise.resolve({
        then: function then(resolve, reject) {
            if (pathname.match('action')) {
                return Router.routers(ctx).then(function (val) {
                    resCtx.body = JSON.stringify(val);
                    resCtx.header = Object.assign(resCtx.header, {
                        'Content-Type': 'application/json'
                    });
                    resolve();
                }).catch(function (err) {
                    resCtx.statusCode = 400;
                    resCtx.body = err.name + ' + ' + err.stack;
                });
            }
            resolve();
        }
    });
};