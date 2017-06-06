const cookieMod = require('cookie')
let whiteNameLis = ['/lwk'];
module.exports = (ctx)=>{
    let { pathname } = ctx.reqCtx;
    let { cookie }=ctx.req.headers;
    let { res }=ctx;
    let cookieObj;
    if(cookie) cookieObj = cookieMod.parse(cookie);
    return Promise.resolve({
        then:(resolve,reject)=>{
            let cookieStr = t=>`name=lwk;Max-Age=${t}`;
            if(whiteNameLis.indexOf(pathname)>=0){
                res.setHeader('Set-Cookie',cookieStr(3600));
            }
            if( cookie && cookieObj['name'] ){
                ctx.resCtx.hasUser=true;
            }
            if(pathname==='/logout'){
                ctx.resCtx.hasUser=false;
                res.setHeader('Set-Cookie',cookieStr(0));
            }
            resolve();
        }
    })
}