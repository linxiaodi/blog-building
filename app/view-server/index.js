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
        url
    } = req;
    return Promise.resolve({
        then: (resolve, reject) => {
            if (url.match('action') || url.match(/\./)) {
                resolve()
            } else {
                if (urlrewrite[url]) {
                    let basePath = path.resolve(__dirname, 'ejs');
                    let htmlPath = path.resolve(basePath, urlrewrite[url] + '.ejs')

                    let layoutPath = path.resolve(basePath, 'layout.ejs')
                    let layoutHtml = fs.readFileSync(layoutPath, 'utf8');

                    let render = ejs.compile(layoutHtml, {
                        filename: layoutPath
                    })
                    resCtx.body = render({
                        templateName: urlrewrite[url]
                    });
                    Object.assign(resCtx.header, {
                        'Contene-Type': mime.lookup(htmlPath)
                    })
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
            // if (urlMap[url]) {
            //     let {viewName} = urlMap[url]
            //     let basePath = path.resolve(process.cwd(), 'public')
            //     let htmlPath = path.resolve(basePath, viewName)

            //     Object.assign(resCtx.header,{
            //         'Contene-Type' : mime.lookup(htmlPath)
            //     })
            //     let render = ejs.compile(fs.readFileSync(htmlPath,'utf8'))
            //     resCtx.body = render();
            // }
            //resolve();
        }
    })
}