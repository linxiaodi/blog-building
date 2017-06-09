/*
 * url-parser
 * 处理客户端数据
 */


 // request: query + body + method

const Url = require('url')

module.exports = (ctx)=>{
	let { method,url } = ctx.req;
	let { reqCtx,req } = ctx;
	//先在这里处理url的参数
	method = method.toLowerCase();
	Object.assign(reqCtx,Url.parse(url,true),{method})
    //处理post请求
	return Promise.resolve({
		then:(resolve,reject)=>{
			if(method == 'post'){
				let data = [];

		 		req.on('data',(chunk)=>{
			 		data.push(chunk);
			 	}).on('end',()=>{
			 		let endData = Buffer.concat(data).toString();
					reqCtx.body = JSON.parse(endData);
					resolve()
			 	});
			}else{
				resolve()
			}
		}
	})	 		
} 