let msg = {
    '/user.action': {
        name: 'lwk',
        age: 22
    },
    '/get.action': {
        car: 'BMW',
        price: '200w'
    }
}


module.exports = (ctx) => {
    let { reqCtx,req,resCtx,res } = ctx;
    let {url,method} = req;
    let data = [];

    if(!url.match('.action')) return Promise.resolve();
    
    resCtx.header = Object.assign(resCtx.header,{'Content-Type':'application/json'})

    if (method.toLowerCase() === 'get') {
        resCtx.body = JSON.stringify(msg[url])
        return Promise.resolve()
    } else {
        return new Promise((resolve, reject) => {
            req.on('data', (chunk) => {
                // data+=chunk 其实是buffer隐式转换成string后进行相加，这样会造成中文字符串的缺失
                data.push(chunk);
            }).on('end', () => {
                data=Buffer.concat(data).toString()
                reqCtx.body = JSON.parse(data);
                //处理post的数据
                resCtx.body = data;
                resolve();
            })
        })
    }
}