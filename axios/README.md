# 尚硅谷2021最新版axios入门与源码解析教程
- 教程日期：2021-01-27
- [bilibili尚硅谷教程视频链接](https://www.bilibili.com/video/BV1wr4y1K7tq)
- 代码示例
```javascript
axios({
    //请求类型
    method:'POST',
    //URL
    url:'http://localhost:3000/posts',
    //设置请求体
    data:{
        "title": "json-server3",
        "author": "typicode" 
    }
}).then(response=>{
    console.log(response);
});
```