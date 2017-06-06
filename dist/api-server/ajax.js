'use strict';

var Router = require('./router/');

var _require = require('./mongo/index'),
    $_saveBlog = _require.$_saveBlog,
    $_saveCategory = _require.$_saveCategory,
    $_getCategoryList = _require.$_getCategoryList,
    $_deleteBlog = _require.$_deleteBlog,
    $_getBlogDetail = _require.$_getBlogDetail,
    $_getBlogList = _require.$_getBlogList;

//保存分类


Router.post('/category.action', function (ctx) {
    var category = ctx.reqCtx.body;
    return $_saveCategory(category);
});
//获取分类
Router.get('/categoryList.action', function (ctx) {
    return $_getCategoryList();
});
//保存，更新博客内容
Router.post('/blog.action', function (ctx) {
    var blog = ctx.reqCtx.body;
    return $_saveBlog(blog);
});
//删除博客
Router.get('/deleteBlog.action', function (ctx) {
    var query = ctx.reqCtx.query;

    console.log('query', query);
    return $_deleteBlog(query);
});
//获取博客详情
Router.get('/blogDetail.action', function (ctx) {
    var query = ctx.reqCtx.query;

    return $_getBlogDetail(query);
});
//获取博客列表
Router.get('/blogList.action', function (ctx) {
    var query = ctx.reqCtx.query;

    return $_getBlogList(query);
});

module.exports = Router;