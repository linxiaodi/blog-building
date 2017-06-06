/*
 *  路由的映射
 *  17.5.1
 *  router.get('/xxx',ctx=>{})
 */

class Router{
    constructor(){
        this.routerMap={
            get:{},
            post:{}
        }
    }
    get(pathname,handler){
        this.routerMap.get[pathname] = handler;
    }
    post(pathname,handler){
        this.routerMap.post[pathname] = handler;
    }
    routers(ctx){
		let {pathname,method} = ctx.reqCtx;
		if(method=='get' || method=='post'){
			let handler = this.routerMap[method][pathname]
            if(handler){
				return Promise.resolve(handler(ctx))
			}else{
				return Promise.resolve()
			}
		}else{
			return Promise.resolve()
		}
	}
}
module.exports = new Router();