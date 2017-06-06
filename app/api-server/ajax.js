const Router = require('./router/')
const {
    $_saveBlog,
    $_saveCategory,
    $_getCategoryList,
    $_deleteBlog,
    $_getBlogDetail,
    $_getBlogList
} = require('./mongo/index')

//保存分类
Router.post('/category.action',ctx=>{
    let category = ctx.reqCtx.body
    return $_saveCategory(category)
})
//获取分类
Router.get('/categoryList.action',ctx=>{
    return $_getCategoryList()
}) 
//保存，更新博客内容
Router.post('/blog.action',ctx=>{
    let blog = ctx.reqCtx.body;
    return $_saveBlog(blog)
})
//删除博客
Router.get('/deleteBlog.action',ctx=>{
    let {query} = ctx.reqCtx;
    console.log('query',query)
    return $_deleteBlog(query)
})
//获取博客详情
Router.get('/blogDetail.action',ctx=>{
	let { query } = ctx.reqCtx
	return $_getBlogDetail(query)
})
//获取博客列表
Router.get('/blogList.action',ctx=>{
	let { query } = ctx.reqCtx
	return $_getBlogList(query)
})

module.exports = Router;