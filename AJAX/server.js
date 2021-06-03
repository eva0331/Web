//1.引入express
const express = require('express');

//2.创建应用对象
const app = express();

//3.创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
app.get('/server', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应
    response.send('HELLO AJAX GET');
})

/*
app.post('/server',(request,response)=>{
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*');
    //设置响应头 设置所有请求头都可以用
    response.setHeader('Access-Control-Allow-Headers','*');
    //设置响应
    response.send('HELLO AJAX POST');
})
*/

//可以接收任意类型的请求 POST OPTION
app.all('/server', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应头 设置所有请求头都可以用
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应
    response.send('HELLO AJAX POST');
})

app.all('/json-server', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应头 设置所有请求头都可以用
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应
    //响应一个数据
    const data = {
        name: 'abc123'
    };
    //对数据进行字符串转换
    let str = JSON.stringify(data);
    //设置响应体
    response.send(str);
})

//针对ie缓存
app.all('/ie', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应头 设置所有请求头都可以用
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应
    response.send('HELLO IE');
})

//延时响应
app.all('/delay', (request, response) => {
    //设置响应头 设置允许跨域
    response.setHeader('Access-Control-Allow-Origin', '*');
    //设置响应头 设置所有请求头都可以用
    response.setHeader('Access-Control-Allow-Headers', '*');
    //设置响应
    setTimeout(() => {
        response.send('延时响应');
    }, 3000)
})

//4.监听端口启动服务
app.listen(8000, () => {
    console.log("服务已经启动，8000端口监听中……");
})