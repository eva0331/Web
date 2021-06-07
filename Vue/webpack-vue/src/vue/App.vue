<template>
  <div>
    <h2 class="title">{{message}}</h2>
    <button @click="btnClick">按钮</button>
    <h2>{{name}}</h2>
  </div>
</template>

<script>
export default {
  name:"APP",
  data () {
    return {
      message: 'Hello Webpack',
      name:'codywhy'
    }
  },
  methods:{
    btnClick(){
      
    }
  }
}
</script>

<style>
.title {
  color: red;
}
</style>
