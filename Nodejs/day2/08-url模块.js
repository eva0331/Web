// /pinglun?name=的撒的撒&message=的撒的撒的撒
// 对于这种表单提交的请求路径，由于其中具有用户动态填写的内容
// 所以你不可能通过去判断完整的 url 路径来处理这个请求
// 使用 url.parse 方法将路径解析为一个方便操作的对象，第二个参数为 true 表示直接将查询字符串转为一个对象（通过 query 属性来访问）
var url = require('url')

var obj = url.parse('/pinglun?name=的撒的撒&message=的撒的撒的撒', true)

console.log(obj)

// /pinglun
console.log(obj.pathname)

// { name: '的撒的撒', message: '的撒的撒的撒' }
console.log(obj.query)
