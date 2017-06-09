## 我的博客网址：[wicklin.site](http://wicklin.site/)
## 前言
本项目是个人从零到一打造的个人博客系统项目，不依赖任何第三方框架，手写Node.js处理中间件。
### 项目结构
```
            |-  app  node中间件及服务
            |-  dist 经过babel转码过后的node文件
            |-  public 博客的前端代码
            |-  index.js 主项目入口
``` 
### `/app`
```
            |-  app 
                 |
                 |- url-parse  对ajax的get/post请求的提取
                 |- cookie-parse 用cookie标识用户,使用白名单来实现登录登出的效果
                 |- api-server   路由的设计以及数据库的操作
                        |
                        |-   mongo 使用mongoose对mongoDB进行CRUD操作。
                        |-   router 路由的设计
                 |- static-server 返回静态资源
                 |- view-server HTML文件的返回并且使用ejs模板
                        |
                        |- ejs 存储前端模板
                        |- urlrewrite.js 前端url路由存储,用于重定向
                 |- index.js  中间层的连接 
```
### `/public/js`
```
            |-  about页面
            |-  components
                    |
                    |- detail 博客的列表
                    |- dialog 对话框
                    |- write Markdown的博客书写
            |- detail 每一篇博客的详情页面
            |- index 网站的首页
            |- manage 博客的管理，需要登录之后才显示
                  |- ajax 前端ajax的拉取
                  |- components 博客管理的所有组件
```
### 管理博客页面展示
![](http://oph3rwqhn.bkt.clouddn.com/17-6-9/93406061.jpg)
![](http://oph3rwqhn.bkt.clouddn.com/17-6-9/56006546.jpg)
![](http://oph3rwqhn.bkt.clouddn.com/17-6-9/41288760.jpg)




## 第三次修改：
- 对url修改，否则会导致我们的ajax请求会变成重定向。
- 引入mongodb

### 知识点
- url模块的url.parse(url,Boolen)的第二个参数的Boolen为false为字符串，true为一个对象。
- 

```
|-db
|--collection
|---document
|----key/val
```

## 第二次修改
- 白名单/黑名单的设置。
- 使用cookie来设置权限，服务台判断是否有权限，使用ejs来操作返回对应的显示结果。

## 第一次修改：
- 分发路由逻辑。
- 重定向的实现。
  - `response`的`header`里手动添加`{Location:'reset url'}`
  - `statusCode:302`
- 引入ejs模板。
