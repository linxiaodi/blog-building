let Router = require('./ajax')

module.exports = (ctx) => {
    let {reqCtx,resCtx} = ctx;
    let {pathname} = reqCtx;
    return Promise.resolve({
        then: (resolve, reject) => {
            if (pathname.match('action')) {
                return Router.routers(ctx).then(val => {
                    resCtx.body = JSON.stringify(val)
                    resCtx.header = Object.assign(resCtx.header, {
                        'Content-Type': 'application/json'
                    })
                    resolve()
                }).catch(err=>{
                    resCtx.statusCode=400
                    resCtx.body =`${err.name} + ${err.stack}`;
                })
            }
            resolve();
        }
    })
}