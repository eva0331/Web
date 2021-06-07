# Vue教程

## 黑马程序员前端基础教程-4个小时带你快速入门vue
#### 教程日期：2019-11-19 
#### [bilibili教程链接](https://www.bilibili.com/video/BV12J411m7MG)
---
### Vue指令
1. 内容绑定，事件绑定
  - v-text
  - v-html
  - v-on基础
1. 显示切换，属性绑定
  - v-show
  - v-if
  - v-bind
3. 列表循环，表单元素绑定
  - v-for
  - v-on补充
  - v-model
---

## coderwhy最全最新Vue、Vuejs教程，从入门到精通
#### 教程日期：2020-02-18 
#### [bilibili教程链接](https://www.bilibili.com/video/BV15741177Eh)
---

### git 常用命令
    git config --global user.name 用户名
    git config --global user.email 邮箱
    
    git init
    git status
    git add .
    git commit -m "update"
    git reflog

    git push https://github.com/whitemarch/Web.git master
    git push -u https://github.com/whitemarch/Web.git master -f
    git pull https://github.com/whitemarch/Web.git master
    git clone https://github.com/whitemarch/Web.git
---

### webpack
-  安装：`npm install webpack@3.6.0 -g`
-  打包：把commomjs转换成浏览器认识的js：`webpack ./src/main.js ./dist/bundle.js`
    >案例文件：webpack-demo1
-  打包的简单方法：配置 webpack.config.js 文件，输入 `webpack` 命令打包
    >案例文件：webpack-demo2
---
    老师的webpack配置相关版本：
    webpack
    npm install webpack@3.6.0

    css-loader
    npm install css-loader@2.0.2 --save-dev

    style-loader
    npm install style-loader@0.23.1 --save-dev

    less-loader
    npm install --save-dev less-loader@4.1.0 less@3.9.0

    url-loader
    npm install --save-dev url-loader@1.1.2

    file-loader 
    npm install --save-dev file-loader@3.0.1

    es6转换成es5
    npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1

    Vue
    npm install vue@2.5.21 --save
---
### webpack-loader
>案例文件：webpack-loader
- [webpack-loader 官网](https://webpack.docschina.org/loaders/)
- package.json 设置：`"build": "webpack"`
- 输入 `npm run build` 命令打包
- css-loader
    + 安装：`npm install css-loader@2.0.2 --save-dev`
    + css-loader 只负责加载 css 文件
    + style-loader 负责将样式添加到 DOM 中
    + 安装 style-loader：`npm install style-loader@0.23.1 --save-dev`
    + 配置 webpack.config.js 文件
    ```js
    module.exports = {
      module: {
        rules: [
          {
            test: /\.css$/i,
            // 使用多个 loader 时从右向左
            use: ["style-loader", "css-loader"],
          },
        ],
      },
    };
    ```
- url-loader
    + 安装：`npm install --save-dev url-loader@1.1.2`
    + 配置 webpack.config.js 文件
    + 安装 file-loader：`npm install --save-dev file-loader@3.0.1`
    + 配置 webpack.config.js 文件
    ```js
    module.exports = {
      entry: './src/main.js',
      output: {
          path: path.resolve(__dirname,'dist'),
          filename: 'bundle.js',
          publicPath:'dist/'
      },
      module: {
        rules: [
          {
            test: /\.(png|jpg|gif)$/i,
              use: [
                {
                  loader: 'url-loader',
                  options: {
                    // 当加载的图片小于 limit 时，将图片编译成 base64 字符串形式
                    // 当加载的图片大于 limit 时，需要使用 file-loader 模块进行加载
                    limit: 8192 // byte
                  }
                }
              ]
          },
        ],
      },
    };
    ```
- babel-loader
    +  安装：`npm install --save-dev babel-loader@7.1.5 babel-core@6.26.3 babel-preset-es2015@6.24.1`
    +  配置 webpack.config.js 文件
    ```js
    {
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,  // 排除
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['es2015']
        }
      }
    },
    ```
---

### webpack 配置 vue
>案例文件：webpack-vue
- 安装：`npm install vue@2.5.21 --save`
- 打包：`npm run build`
- 报错：runtime-only 不支持 template
- 配置 webpack.config.js 文件
  ```js
  resolve:{
    alias:{   // 别名
      'vue$':'vue/dist/vue.esm.js'
    }
  }
  ```

### 单文件组件 .vue 文件的封装处理
- 安装 vue-loader 和 vue-template-compiler
  + `npm i vue-loader@13.0.0 vue-template-compiler@2.5.21 --save-dev`
- 配置 webpack.config.js 文件
  ```js
  {
    test: /\.vue$/,
    use: ['vue-loader'],
  }
  ```

---
### vuecli
- 安装vue脚手架
`npm install @vue/cli -g`
- 安装vue旧版2.x脚手架
`npm install @vue/cli-init -g`
- vuecli2初始化项目
`vue init webpack my-project`
  + runtime-compiler 和 runtime-only 选择后者，因为性能高、代码量少
- vuecli3初始化项目
`vue create my-project`
- vuecli4初始化项目
`npx Vue create my-project`
- 打包项目
`npm run build`
- e2e端到端
