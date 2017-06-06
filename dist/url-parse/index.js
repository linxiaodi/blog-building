'use strict';

/*
 * url-parser
 * 处理客户端数据
 */

// request: query + body + method

var Url = require('url');

module.exports = function (ctx) {
	var _ctx$req = ctx.req,
	    method = _ctx$req.method,
	    url = _ctx$req.url;
	var reqCtx = ctx.reqCtx,
	    req = ctx.req;
	//先在这里处理url的参数

	method = method.toLowerCase();
	Object.assign(reqCtx, Url.parse(url, true), { method: method });
	//处理post请求
	return Promise.resolve({
		then: function then(resolve, reject) {
			//console.log(url)
			if (method == 'post') {
				var data = [];
				//paused flow 
				//paused ===> flow
				req.on('data', function (chunk) {
					data.push(chunk);
				}).on('end', function () {
					var endData = Buffer.concat(data).toString();
					//这里直接返回post请求的数据
					//通知下一个流程
					reqCtx.body = JSON.parse(endData);
					resolve();
				});
			} else {
				resolve();
			}
		}
	});
};