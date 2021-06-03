# Node.js day2 笔记

## 服务端渲染

  + 说白了就是在服务端使用模板引擎
  + 模板引擎最早诞生于服务端，后来才发展到了前端
---

## 服务端渲染和客户端渲染的区别

  + 客户端渲染（页面加载不需刷新）不利于 SEO（搜索引擎优化）
  + 服务端渲染（页面加载需要刷新）是可以被爬虫抓取到的，客户端异步渲染（AJAX）是很难被爬虫抓取到的
  + 所以你会发现真正的网站既不是纯异步也不是纯服务端渲染出来的，而是两者结合来做的
  + 例如京东的商品列表就采用的是服务端渲染，目的了为了 SEO 搜索引擎优化
  + 而它的商品评论列表为了用户体验，而且也不需要 SEO 优化，所以采用是客户端渲染
---

## 实现 Apache 功能

  + 一个请求对应一个响应，如果在一个请求的过程中，已经结束响应了，则不能重复发送响应。
  + 咱们以前使用过 Apache 服务器软件，这个软件默认有一个 www 目录，所有存放在 www 目录中的资源都可以通过网址来浏览。
  + 使用 `fs.readdir` 得到 wwwDir 目录列表中的文件名和目录名
---

## 在node中使用模板引擎 art-template
  + 安装：`npm install art-template`
  + 只需要使用 require 方法加载就可以了：`var template = require('art-template')`
  + 使用：`template.render()`
  + 在浏览器中使用模板引擎需要引用 lib/template-web.js 文件
---

## url 模块
  + 使用 url.parse 方法将路径解析为一个方便操作的对象
  ```javascript
  var url = require('url')
  
  var obj = url.parse('/pinglun?name=的撒的撒&message=的撒的撒的撒',true)
  
  console.log(obj.query)
  ```
---

## 留言本案例

>案例文件：feedback文件夹
- 处理留言本案例首页数据列表渲染展示
- 处理留言本案例发表留言功能
  + 路径
  + 设计好的请求路径
  + $GET 直接或查询字符串数据
  + Node 中需要咱们自己动手来解析
    * url.parse()
  + /pinglun?name=jack&message=hello
  + split('?')
  + name=jack&message=hello
  + split('&')
  + name=jack message=hello
  + forEach()
  + name=jack.split('=')
  + 0 key
  + 1 value
- 如何在 Node 中实现服务器重定向
  + header('location')
    * 301 永久重定向 浏览器会记住
      - a.com b.com
      - a 浏览器不会请求 a 了
      - 直接去跳到 b 了
    * 302 临时重定向 浏览器不记忆
      - a.com b.com
      - a.com 还会请求 a
      - a 告诉浏览器你往 b
- Node 中的 Console（REPL）使用