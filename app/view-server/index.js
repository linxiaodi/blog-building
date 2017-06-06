const ejs = require('ejs')
const path = require('path')
const fs = require('fs')
const mime = require('mime')

let urlrewrite = require('./urlrewrite');
/*
 *  HTML加载中间件 
 */
module.exports = (ctx) => {
    let {
        req,
        resCtx
    } = ctx;
    let {
        pathname
    } = ctx.reqCtx;
    return Promise.resolve({
        then: (resolve, reject) => {
            
            if (pathname.match('action') || pathname.match(/\./)) {
                resolve()
            } else {
                if (urlrewrite[pathname]) {
                    let basePath = path.resolve(__dirname, 'ejs');
                    let layoutPath = path.resolve(basePath, 'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath, 'utf8');
                    let render = ejs.compile(layoutHtml, {
                        filename: layoutPath
                    })
                    resCtx.body = render({
                        viewName: urlrewrite[pathname],
                        hasUser:resCtx.hasUser
                    });
                    resCtx.header = Object.assign(resCtx.header,{
						'Content-Type':'text/html'
					});
                    resolve();
                } else {
                    //重定向
                    Object.assign(resCtx.header, {
                        Location: '/'
                    })
                    resCtx.statusCode = 302;
                    resCtx.statusMsg = 'redirect'
                    resCtx.body = ''
                    resolve();
                }
            }
        }
    })
}