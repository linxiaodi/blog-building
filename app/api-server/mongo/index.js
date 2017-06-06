/*
 * creating model
 */
let {blogSchema,categorySchema} = require('./schema');
const mongoose = require('mongoose');
//第一个参数是Collection,第二个参数是Schema
let BlogModel = mongoose.model('Blog',blogSchema);
let CategoryModel= mongoose.model('Category',categorySchema);
//new：bool - true返回修改后的文档而不是原始文件。默认为true
//upsert：bool - 如果对象不存在，则创建对象。默认为false。

//保存/更新博客
let $_saveBlog = blog=>{
    let condition={title:blog.title};
    blog.date = new Date().toLocaleString();
    return BlogModel.findOneAndUpdate(condition,blog,{
        new:true,
        upsert:true
    }).then(blog=>{
        return {
            status:1,
            data:blog
        }
    })
}
//保存分类
let $_saveCategory = category=>{
    return CategoryModel.findOneAndUpdate({name:category.name},category,{
        upsert:true,
        new : true
    }).then(_category=>{
        return {
            status:1,
            data:_category
        }
    })
}
//获取分类列表
let $_getCategoryList = ()=>{
    return CategoryModel.find().exec().then(categoryList=>{
        return {
            status:1,
            data:categoryList
        }
    })
}
//删除博客
let $_deleteBlog = query=>{
    let condition = {
        _id:mongoose.Types.ObjectId(query._id)
    }
    console.log('con',condition)
    return BlogModel.remove(condition).exec().then(blog=>{
        return {
            status:1,
            data:blog
        }
    })
}
//获取博客详情
let $_getBlogDetail = query=>{
    let condition = {
        _id:mongoose.Types.ObjectId(query.id)
    }
    return BlogModel.find(condition).exec().then(blog=>{
        return {
            status:1,
            data:blog
        }
    })
}

let $_getBlogList = ()=>{
    //{'category.name':'about'} ==> nested query
    return BlogModel.find().exec().then(blogList=>{
        return {
            data:blogList
        }
    })
}
module.exports={
    $_saveBlog,
    $_saveCategory,
    $_getCategoryList,
    $_deleteBlog,
    $_getBlogDetail,
    $_getBlogList
}
