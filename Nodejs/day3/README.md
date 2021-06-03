# Node.js day3 笔记

## each,forEach
  + art-template 和 jQuery 一毛钱关系都没有
  + each 是 art-template 的模板语法，专属的
  ```html
  {{each 数组}}
  <li>{{ $value }}</li>
  {{/each}} 
  ```
  + 这是 art-template 模板引擎支持的语法，只能在模板字符串中使用
  + $.each(数组, function)
  + $('div').each(function) 一般用于遍历 jQuery 选择器选择到的伪数组实例对象
  + forEach 是 EcmaScript 5 中的一个数组遍历函数，是 JavaScript 原生支持的遍历方法 可以遍历任何可以被遍历的成员
  + jQuery 的 each 方法和 forEach 几乎一致
  + 由于 forEach 是 EcmaScript 5 中的，所以低版本浏览器不支持
  + jQuery 的 each 由 jQuery 这个第三方库提供
    * jQuery 2 以下的版本是兼容 IE 8 的
    * 它的 each 方法主要用来遍历 jQuery 实例对象（伪数组）
    * 同时它也可以作为低版本浏览器中 forEach 替代品
    * jQuery 的实例对象不能使用 forEach 方法，如果想要使用必须转为数组才可以使用
    * `[].slice.call(jQuery实例对象)`
    ```javascript
    Array.prototype.mySlice = function () {
      var start = 0
      var end = this.length
      if (arguments.length === 1) {
        start = arguments[0]
      } else if (arguments.length === 2) {
        start = arguments[0]
        end = arguments[1]
      }
      var tmp = []
      for (var i = start; i < end; i++) {
        // fakeArr[0]
        // fakeArr[1]
        // fakeArr[2]
        tmp.push(this[i])
      }
      return tmp
    }
    
    var fakeArr = {
      0: 'abc',
      1: 'efg',
      2: 'haha',
      length: 3
    }
    
    // 所以你就得到了真正的数组。 
    [].mySlice.call(fakeArr)
    ```
---

## a.js,b.js 调用 
  如果从a中调用b中的数据，又从b中调用a中的数据，执行a代码，为什么把b中的执行完后才会执行a，而不是在b调用a的时候a中的代码继续执行
  + a 加载了 b
    * 执行 b 中的代码
    * 同时得到 b 中导出的接口对象：exports
    * 执行 b 的过程中发现 b 也在 require a
    * b 就会反过来执行 a
    * a 中又加载 b
    * b 又反过来加载 a
    * 这就是循环加载
    * 如果你一旦出现了这种情况，说明你的思路有问题。
    * jQuery.js （可能不可能出现 jQuery 依赖了 main）
    * main.js 依赖了 jQuery
    * 这个问题是矛盾。
  + b 中也加载了 a 
  + 网页中所有的路径其实都是 url 路径，不是文件路径
---

## 模块中导出多个成员和导出单个成员
```javascript
module.exports.foo = 'bar'

module.exports.add = function (x, y) {
  return x + y
}
```  
---

## exports 和 module.exports 的区别
  + 每个模块中都有一个 module 对象
  + module 对象中有一个 exports 对象
  + 我们可以把需要导出的成员都挂载到 module.exports 接口对象中
  + 也就是：`moudle.exports.xxx = xxx` 的方式
  + 但是每次都 `moudle.exports.xxx = xxx` 很麻烦，点儿的太多了
  + 所以 Node 为了你方便，同时在每一个模块中都提供了一个成员叫：`exports`
  + `exports === module.exports` 结果为  `true`s
  + 所以对于：`moudle.exports.xxx = xxx` 的方式 完全可以：`expots.xxx = xxx`
  + 当一个模块需要导出单个成员的时候，这个时候必须使用：`module.exports = xxx` 的方式
  + 不要使用 `exports = xxx` 不管用
  + 因为每个模块最终向外 `return` 的是 `module.exports`
  + 而 `exports` 只是 `module.exports` 的一个引用
  + 所以即便你为 `exports = xx` 重新赋值，也不会影响 `module.exports`
  + 但是有一种赋值方式比较特殊：`exports = module.exports` 这个用来重新建立引用关系的
  + 之所以让大家明白这个道理，是希望可以更灵活的去用它
  ```javascript
  moudle.exports = {
    a: 123
  }

  // 重新建立 exports 和 module.exports 之间的引用关系
  exports = module.exports

  exports.foo = 'bar'
  ``` 
---

## require 方法加载规则

  + 优先从缓存加载
  + 核心模块
  + 路径形式的模块
  + 第三方模块
    * node_modules
---

## npm
  + node package manager
  + 升级 npm : `npm install --global npm`
  +  `npm init -y` 可以跳过向导，快速生成 package.json
  +  `npm install 包名 --save` 安装包（ `npm i 包名 --save` ）
  +  `npm uninstall 包名 --save` 删除包（ `npm un 包名 --save` ）
  + npm 5 以后的版本安装包的时候不用加 --save ，会自动保存依赖信息
  +  `npm --help` 使用帮助 `npm 命令名 --help` 
  + 安装淘宝 cnpm：`npm install --global cnpm` 安装包： `cnpm i 包名 --save`
  + 不安装 cnpm 的方法：`npm config set registry https://registry.npm.taobao.org` 使用 `npm install 包名 --save` 时默认用 cnpm 下载安装
  + 查看 npm 配置信息：`npm config list`
---

## package.json 包描述文件
  + 我们建议每个项目根目录下都要有一个 package.json 文件，就像产品说明书一样
  + 这个文件可以通过 `npm init` 命令自动初始化出来
  + dependencies （依赖）选项可以帮我们保存第三方包的依赖信息
  + 安装第三方模块时加上 --save 会在 package.json 中添加 dependencies 信息
  + 建议这样安装第三方包： `npm i art-template --save`
  + 有 package.json 文件的项目删除了 node_modules 包，用 `npm install` 命令可以把 dependencies 中所有的依赖项重新安装回来
  ```javascript
  {
    "dependencies": {
      "art-template": "^4.12.2"
    }
  }
  ```
  + 当你安装包的时候，新版的 npm 5 还会自动生成或者更新这个文件：package-lock.json
  + package-lock.json 文件会保存 node_modules 中所有包的信息（版本、下载地址），这样的话重新安装速度会提升
  + package-lock.json 文件会锁定版本号，防止自动升级新版
  + package.json 的依赖版本是最低版本，重新下载会下载最新版本
