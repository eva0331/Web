import { createApp } from 'vue'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import App from './App.vue'
import router from './router'
import store from './store'

import './mock/mockServer' // 加载mockServer即可
import loading from './assets/imgs/loading.gif'
import './fiters' // 加载过滤器

// 注册全局组件标签
Vue.component(Button.name, Button)  // <mt-button>
Vue.use(VueLazyload, { // 内部自定义一个指令lazy
  loading
})

createApp(App).use(store).use(router).mount('#app')
