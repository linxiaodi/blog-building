'use strict';

/*
 * creating model
 */
var _require = require('./schema'),
    blogSchema = _require.blogSchema,
    categorySchema = _require.categorySchema;

var mongoose = require('mongoose');
//第一个参数是Collection,第二个参数是Schema
var BlogModel = mongoose.model('Blog', blogSchema);
var CategoryModel = mongoose.model('Category', categorySchema);
//new：bool - true返回修改后的文档而不是原始文件。默认为true
//upsert：bool - 如果对象不存在，则创建对象。默认为false。

//保存/更新博客
var $_saveBlog = function $_saveBlog(blog) {
    var condition = { title: blog.title };
    blog.date = new Date().toLocaleString();
    return BlogModel.findOneAndUpdate(condition, blog, {
        new: true,
        upsert: true
    }).then(function (blog) {
        return {
            status: 1,
            data: blog
        };
    });
};
//保存分类
var $_saveCategory = function $_saveCategory(category) {
    return CategoryModel.findOneAndUpdate({ name: category.name }, category, {
        upsert: true,
        new: true
    }).then(function (_category) {
        return {
            status: 1,
            data: _category
        };
    });
};
//获取分类列表
var $_getCategoryList = function $_getCategoryList() {
    return CategoryModel.find().exec().then(function (categoryList) {
        return {
            status: 1,
            data: categoryList
        };
    });
};
//删除博客
var $_deleteBlog = function $_deleteBlog(query) {
    var condition = {
        _id: mongoose.Types.ObjectId(query._id)
    };
    console.log('con', condition);
    return BlogModel.remove(condition).exec().then(function (blog) {
        return {
            status: 1,
            data: blog
        };
    });
};
//获取博客详情
var $_getBlogDetail = function $_getBlogDetail(query) {
    var condition = {
        _id: mongoose.Types.ObjectId(query.id)
    };
    return BlogModel.find(condition).exec().then(function (blog) {
        return {
            status: 1,
            data: blog
        };
    });
};

var $_getBlogList = function $_getBlogList() {
    //{'category.name':'about'} ==> nested query
    return BlogModel.find().exec().then(function (blogList) {
        return {
            data: blogList
        };
    });
};
module.exports = {
    $_saveBlog: $_saveBlog,
    $_saveCategory: $_saveCategory,
    $_getCategoryList: $_getCategoryList,
    $_deleteBlog: $_deleteBlog,
    $_getBlogDetail: $_getBlogDetail,
    $_getBlogList: $_getBlogList
};