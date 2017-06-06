## 我的博客网址：

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
