let fs = require('fs');
let path = require('path');

function getUrl(url) {
    let urlHeader = './public'
    return path.resolve(process.cwd(), urlHeader + url)
}
const mime = require('mime')

function init(ctx) {

    return new Promise((resolve, reject) => {
        let urlMap = {
            '/favicon.ico': '/index.html'
        }
        let {url} = ctx.req;
        let {resCtx} = ctx;
        if (!url.match('.action') && url.match(/\./)) { //判断是否为ajax请求
            url = urlMap[url] || url;
            Object.assign(resCtx.header,{
                'Contene-Type' : mime.lookup(url)
            })
            url = getUrl(url);
            fs.readFile(url, (error, data) => {
                if (error) reject(error);
                resCtx.body = data;
                resolve()
            })
        }else{
            resolve();
        }


    })

}
module.exports = init;