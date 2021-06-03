# Node.js day5 笔记

## 问题
  - var router = require('./router') 这一步不是加载router.js并执行该文件吗 为什么还要执行app.use(router) app.use 不是开放静态资源吗 app.use(router)在这里是什么意思，挂载到 app 服务中的意思是？ module.exports = app 也不懂
    + 这里涉及到一个中间件的概念
    + app.use 不仅仅是用来处理静态资源的
    + 还可以做很多工作
    + 配置 body-parse 也是通过 app.use 来配置的
    + 这叫中间件，其中有一套规则

  - 为什么模板引擎在app.js中引入之后在router.js中不引入可以直接使用，而express还需要在router.js中再引入一次 app.js中路由器挂载不是很懂 router.js中为什么要创建一个路由器容器，不知道作用是干什么的 es6中的find方法不是很懂
    + 中间件
    + EcmaScript 6 的 find 方法

  - 在express框架中怎么判断访问页面不存在的情况？
---

## 回调函数

  + 同步任务和异步任务
    - 同步和异步操作的区别就是是否阻碍后续代码的执行。
    - 同步任务是那些没有被引擎挂起、在主线程上排队执行的任务。只有前一个任务执行完毕，才能执行后一个任务。
    - 异步任务是那些被引擎放在一边，不进入主线程、而进入任务队列的任务。只有引擎认为某个异步任务可以执行了（比如 Ajax 操作从服务器得到了结果）【发布订阅】，该任务（采用回调函数的形式）才会进入主线程执行。排在异步任务后面的代码，不用等待异步任务结束会马上运行，也就是说，异步任务不具有“堵塞”效应。
    - 在setTimeout的执行形式上来看，setTimeout是不会阻碍其后续代码的执行的。所以可以理解为setTimeout是异步操作。
  + 异步编程
  + 如果需要得到一个函数内部异步操作的结果，这是时候必须通过回调函数来获取
  + 在调用的位置传递一个函数进来
  + 在封装的函数内部调用传递进来的函数
---

## find、findIndex、forEach

  + 数组的遍历方法，都是对函数作为参数一种运用
    + every
  + some
  + includes
  + map
  + reduce
---

## JavaScript 模块化

  + Node 中的 CommonJS
  + 浏览器中的
    * AMD require.js
    * CMD sea.js
  + EcmaScript 官方在 EcmaScript 6 中增加了官方支持
  + EcmaScript 6
  + 后面我们会学，编译工具
---

## MongoDB 数据库

  >案例文件：mongoose-demo文件夹

  + MongoDB 的数据存储结构
    * 非关系型数据库
    * 键值对（key-value）存储数据
    * 集合（表）
    * 文档（表记录）
  + 下载
    - www.mongodb.com
    - 配置环境变量 path 新建 D:\MongoDB\Server\4.4\bin
    - cmd `mongod --version` 测试是否安装成功
  + 启动数据库服务
    - 管理员身份打开 powershell 命令行输入 `net start mongodb`
  + 连接和退出数据库
    - 连接：`mongo`
    - 断开连接：`exit`
  + 基本命令
    - 查看所有数据库 `show dbs`
    - 查看当前操作的数据库 `db`
    - 切换到指定数据库（没有会新建） `use 数据库名称`
    - 插入数据
        * `use itcast`
        * `db.students.insertOne({"name":"Jack",age=18})`
        * `show collections`
        * `db.students.find()`
  - MongoDB 官方有一个 mongodb 的包可以用来操作 MongoDB 数据库
    + 这个确实和强大，但是比较原始，麻烦，所以咱们不使用它
  - mongoose
    + 真正在公司进行开发，使用的是 mongoose 这个第三方包
    + 它是基于 MongoDB 官方的 mongodb 包进一步做了封装
    + 可以提高开发效率，让你操作 MongoDB 数据库更方便
    + `npm i mongoose`
    + 掌握使用 mongoose 对数据集合进行基本的 CRUD
    + 把之前的 crud 案例改为了 MongoDB 数据库版本
  - 使用 Node 操作 mysql 数据库
    >案例文件：mysql-demo文件夹
    + `npm i mysql`
---
## promise
  + http://es6.ruanyifeng.com/#docs/promise
  + callback hell 回调地狱
  + 回调函数中套了回调函数
  + Promise(EcmaScript 6 中新增了一个语法 API)
  + 容器
    * 异步任务（pending）
    * resolve
    * reject
  + then 方法获取容器的结果（成功的，失败的）
  + then 方法支持链式调用
  + 可以在 then 方法中返回一个 promise 对象，然后在后面的 then 方法中获取上一个 then 返回的 promise 对象的状态结果