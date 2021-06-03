# Node.js day4 笔记

## 文件路径中的 `/` 和模块标识中的 `/` 的区别

  >案例文件：00-模块标识的杠.js、data文件夹
---

## nodemon

  - 修改完js代码自动重启服务器
  - 安装 `npm i nodemon  -g`
  - 查看是否安装成功：`nodemon -v`
  - 使用方法： `nodemon app.js`
---

## 初识 Express

  >案例文件：express-demo文件夹

  - 基于 Node.js 的快速框架
  - 安装 express 包： `npm init -y` 、`npm i express --save`
  - 代码示例：
  ```javascript
  var express = require('express')
  
  var app = express()
  
  app.get('/', function (req, res) {
    res.send('你好，我是 Express!')
  })
  
  app.listen(3000, function () {
    console.log('app is running at port 3000.')
  }) 
  ```
---

## Express

  >案例文件：feedback-express文件夹

  - 基本路由
  ```javascript
  // get
  app.get('/', function (req, res) {
    res.send('Hello world')
  })
  // post
  app.post('/', function (req, res) {
    res.send('Got a post request')
  })
  // 路由其实就是一张表
  // 这个表里面有具体的映射关系
  // xxx 大厦
  //    xxx 公司
  // 看门的老大爷
  //    xxx 公司 15 楼 3 号
  //    百度公司 4 楼 5 号
  //    。。。
  // 经过看门的老大爷，选择你要去哪个公司
  
  // app
  //   .get('/login', 函数)
  //   .get('/dsadsa', 函数)
  //   .post('/d/sadsa', 函数)
  //   .get('dsadsa', 函数)
  ```
  - 静态服务
  ```javascript
  // 当以 /public/ 开头的时候，去 ./public/ 目录中找找对应的资源
  // http://127.0.0.1:3000/public/login.html
  // 这种方式更容易辨识，推荐这种方式
  app.use('/public/', express.static('./public/'))
  // 去掉第一个参数，可以通过省略 /public 的方式访问 http://127.0.0.1:3000/login.html
  app.use(express.static('./public/'))
  // '/abc/d/' 是 '/puiblic' 的别名
  // http://127.0.0.1:3000/abc/d/login.html
  app.use('/abc/d/', express.static('./public/'))
  ```
  - art-template 模板引擎的配置
    + [art-template GitHub仓库](https://github.com/aui/art-template)
    + [art-template 官方文档](http://aui.github.io/art-template/)
    + 安装：`npm i art-template --save` 、`npm i   express-art-template --save`
    + 配置使用 art-template 模板引擎
    ```javascript
    // 第一个参数，表示，当渲染以 .art 结尾的文件的时候，用       art-template 模板引擎
    app.engine('art', require('express-art-template'))
    // 使用
    app.get('/', function (req, res) {
      res.render('index.html', {
        titil: 'hello world'
      })
    })
    ```
  - body-parser 解析表单 POST 请求体
    + 用第三方包（API）获取 post 请求体数据
    + 安装：`npm i body-parser --save`
    + 配置和使用：
    ```javascript
    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
    app.use(bodyParser.json())
    // 使用
    var bodyParser = require('body-parser')
    // get 用 req.query 获取数据
    app.post('/post', function (req, res) {
      console.log(req.body)
    })
    ```
  ---

## CRUD 案例中单独提取路由模块

  >案例文件：crud-express文件夹

  - router.js 文件
  ```javascript
  // Express 提供了一种更好的方式
  // 专门用来包装路由的
  var express = require('express')

  // 1. 创建一个路由容器
  var router = express.Router()

  // 2. 把路由都挂载到 router 路由容器中

  /*
  * 渲染学生列表页面
  */
  router.get('/students', function (req, res) {
    Student.find(function (err, students) {
      if (err) {
        return res.status(500).send('Server error.')
      }
      res.render('index.html', {
        fruits: [
          '苹果',
          '香蕉',
          '橘子'
        ],
        students: students
      })
    })
  })

  /*
  * 渲染添加学生页面
  */
  router.get('/students/new', function (req, res) {
    res.render('new.html')
  })

  // 3. 把 router 导出
  module.exports = router
  ```
  - app.js 文件
  ```javascript
  // 把路由容器挂载到 app 服务中
    app.use(router)
  ```
  - 设计操作数据的 API 文件模块
  ```javascript
  /**
    * student.js
    * 数据操作文件模块
    * 职责：操作文件中的数据，只处理数据，不关心业务
    *
    * 这里才是我们学习 Node 的精华部分：奥义之所在
    * 封装异步 API
  */


  /**
    * 获取学生列表
    * return []
  */
  exports.find = function () {
  }

  /**
  * 添加保存学生
  */
  exports.save = function () {
  }

  /**
  * 更新学生
  */
  exports.update = function () {  
  }

  /**
  * 删除学生
  */
  exports.delete = function () {   
  }
  ```
 - 异步回调
```javascript
function fn(callback) {
  // var callback = function (data) { console.log(data) }

  setTimeout(function () {
    var data = 'hello'
    callback(data)
  }, 1000)
}

// 如果需要获取一个函数中异步操作的结果，则必须通过回调函数来获取
fn(function (data) {
  console.log(data)
})
```