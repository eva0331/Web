# 尚硅谷Web前端Ajax教程初学者零基础入门到精通全套完整版（ajax最新版）
- 教程日期：2020-07-27
- [bilibili教程链接](https://www.bilibili.com/video/BV1WC4y1b78y)
- 代码示例
```javascript
//1.创建对象
const xhr=new XMLHttpRequest();
//设置响应体数据的类型
xhr.responseType='json';
//2.初始化 设置请求方法和url
xhr.open('POST','http://127.0.0.1:8000/json-server');
//3.发送
xhr.send();
//4.时间绑定 处理服务端返回的结果 readystate表示状态 0 1 2 3 4
xhr.onreadystatechange=function(){
    //判断服务器是否返回了所有结果
    if(xhr.readyState===4){
        if(xhr.status>=200&&xhr.status<300){
            // result.innerHTML=xhr.response;
            //手动对数据转化
            // let data=JSON.parse(xhr.response);
            // console.log(data);
            // result.innerHTML=data.name;
            //自动转化
            result.innerHTML=xhr.response.name;
        }
    }
}
```