let fs = require('fs');
let path = require('path');


class APP {
    constructor(){
        this.arrMiddlewear = [];
        this.middlewearChain = Promise.resolve();
    }
    use(middlewear){
        this.arrMiddlewear.push(middlewear)
    }
    composeMiddlewear(context){
        for(let i=0; i<this.arrMiddlewear.length; i++){
            this.middlewearChain = this.middlewearChain.then(()=>{
                return this.arrMiddlewear[i](context);
            })
        }
        return this.middlewearChain;
    }
    initSever() {

        return (request, response) => {

            let context ={
                req : request,
                reqCtx : {
                    body : '',//post 的数据
                    query : {} //get 的数据
                },
                res : response,
                resCtx : {
                    hasUser:false,
                    statusCode:200,
                    statusMsg:'resolved ok',
                    header : {'X-powered-by': 'Node.js'}, //返回头
                    body :''   //返回给前端数据
                }
            }
            this.composeMiddlewear(context)
            .then(() => {
                let {statusCode,statusMsg,header,body}=context.resCtx;
                response.writeHead(statusCode,statusMsg,header);
                response.end(context.resCtx.body);
            })  
        }
    }
}

module.exports = APP;