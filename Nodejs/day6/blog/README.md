## 目录结构
```shell
├── app.js              项目的入口文件
├── controllers
├── models              存储使用 mongoose 设计的数据模型
├── node_modules        第三方包
├── package.json        包描述文件
├── package-lock.json   第三方包锁定文件
├── public              公共的静态资源
├── README.md           项目说明文档
├── routes              如果业务比较多，代码量大，最好把路由按业务分类存储到 routes 目录中
├── router.js           简单一点把所有路由都放到这个文件
└── views               存储视图目录
```
## 路由设计
| 路径 | 方法 | get 参数 | post 参数 | 是否需要登陆 | 备注 |
| --- | --- | --- | --- | --- | --- |
| / | GET |  |  |  | 渲染首页 |
| /register | GET |  |  |  | 渲染注册页面 |
| /register | POST |  | email、nickname、passwoed |  | 处理注册请求 |
| /login | GET |  |  |  | 渲染登陆页面 |
| /login | POST |  | email、passwoed |  | 处理登陆请求 |
| /logout | GET |  |  |  | 处理退出请求 |