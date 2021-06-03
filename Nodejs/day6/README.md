# Node.js day6 笔记

## blog 项目
>案例文件：blog 文件夹
  - 初始化项目文件
    + `npm init -y`
    + `git init`
    + `npm i express mongoose`
    + 新建 README.md 文件、.gitignore 文件、public 文件夹（css、img、js）、app.js 文件
---

## path 路径模块
  - Node.js 通过path这个内置模块，提供了一些路径操作的API，具体可以参考官方的api文档。这里列举一些常用的API。
  - path.extname() 获取文件/路径的扩展名
    + 代码格式：`path.extname(myPath);`
    + 获取 myPath 这个文件或者路径的扩展名。
    + myPath 这个参数要求是字符串。如果 myPath 不是字符串，则抛出 TypeError。
    ```js
    const path = require('path');

    path.extname('hello.txt'); // 返回 '.txt'

    path.extname('www.qianguyihao.com'); // 返回 '.com'

    path.extname('index.coffee.md');  // 返回 '.md'

    path.extname('index.');  // 返回 '.'

    path.extname('index');  // 返回 ''

    path.extname('.index');  // 返回 ''

    path.extname('.index.md');  // 返回 '.md'
    ```
  - path.basename() 获取文件/路径的文件名
    + `path.basename('c:/a/b/index.js');` 返回 'index.js'
    + `path.basename('c:/a/b/index.js','.js');` 返回 'index'
  - path.dirname() 获取文件/路径的目录
    + `path.dirname('c:/a/b/index.js');` 返回 'c:/a/b'
  - path.isAbsolute() 判断是否是绝对路径
    + `path.isAbsolute('c:/a/b/index.js');` 返回 true
    + `path.isAbsolute('./index.js');` 返回 false
    + `path.isAbsolute('/a/index.js');` 返回 true
  - path.parse() 获取文件/路径的目录、文件名等信息
    + `path.parse('c:/a/b/index.js');` 
    + 返回：
    ```js
    {
      root: 'c:/',    // 根目录 
      dir: 'c:/a/b',   // 目录
      base: 'index.js',  // 包含后缀的文件名
      ext: '.js',      // 文件扩展名
      name: 'index'    // 不包含后缀的文件名
    }
    ```
  - path.join() 将多个路径进行拼接
    + `path.join('c:/a','b')` 返回 'c:\\a\\b'
---

## __dirname 和 __filename
  + 在 Node 的每个模块中除了 require、exports 等 API 之外，还有 __dirname 和 __filename
  + __dirname **动态的** 获取当前文件模块所属目录的绝对路径
  + __filename **动态的** 获取当前文件的绝对路径
  + 用来解决文件操作路径的相对路径问题
  + 因为在文件操作中，相对路径相对于执行 `node` 命令所处的目录
  + 所以为了尽量避免这个问题，都建议文件操作的相对路劲都转为：**动态的绝对路径**
  + 方式：`path.join(__dirname, '文件名')`
---

## art-template 模板引擎(include、block、extend)
  >案例文件：03-art-template模板继承和子模板 文件夹
  + include
  + extend
  + block
---

## 表单同步提交和异步提交区别
  + 以前没有 ajax 都是这么干的，甚至有些直接就是渲染了提示信息出来了
  + 异步提交页面不会刷新，交互方式更灵活
---

## Express 中配置使用 express-session 插件
  + 保存登陆状态
  + `npm i express-session`
---

## 概述案例中注册-登陆-退出的前后端交互实现流程
---
