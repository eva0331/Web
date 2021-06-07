// 1.使用 commonjs 的模块化规范
const {add,mul} = require('./js/mathUtils.js')

console.log(add(10,20));
console.log(mul(10,20));

// 2.使用 ES6 的模块化规范
import {name,age,height} from "./js/foo.js";

console.log(name);
console.log(age);
console.log(height);

// 3.依赖 css 文件
require('./css/normal.css')

// 4.使用 Vue 进行开发
import Vue from 'vue'
import App from './vue/App.vue'

const app = new Vue({
    el:'#app',
    template:'<App/>',
    components:{
      App
    }
})

