let fs = require('fs');
let path = require('path');

function getUrl(pathname) {
    let pathnameHeader = './public'
    return path.resolve(process.cwd(), pathnameHeader + pathname)
}
const mime = require('mime')

function init(ctx) {

    return new Promise((resolve, reject) => {        
        let urlMap = {
            '/favicon.ico': '/index.html'
        }
        let {pathname} = ctx.reqCtx;
        let {resCtx} = ctx;
        if (!pathname.match('action') && pathname.match(/\./)) { //判断是否为ajax请求
            //这里我们请求静态资源
            pathname = urlMap[pathname] || pathname;
            Object.assign(resCtx.header,{
                'Contene-Type' : mime.lookup(pathname)
            })
            pathname = getUrl(pathname);
            fs.readFile(pathname, (error, data) => {
                if (error) resCtx.body = `NOT FOUND${error.stack}`;
                resCtx.body = data;
                resolve()
            })
        }else{
            resolve();
        }


    })

}
module.exports = init;