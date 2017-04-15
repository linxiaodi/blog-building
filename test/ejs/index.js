const path = require('path');
const ejs = require('ejs')

let html = `hello <%- include('test') %>`
let world = 'it is me'
//let f1 = ejs.compile(html) //将字符串转换成函数 也就是说会被转换成: return (location)=>{ hello location.world }
// console.log(f1) //function 
//let newF1 = f1({world})// || f1({world : world}) 

// <%%> 逻辑运算
// <%= %> 转义后输出，防止XSS
// <%- %> 原汁原味的输出
// ejs内置的include('xx')函数 ：相那个当于调用fs模块： fs.readFileSync('xx')

let f1 = ejs.compile(html,{
    filename : path.resolve(__dirname,'./ejs')
})
console.log(f1())