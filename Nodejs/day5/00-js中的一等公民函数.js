// 一种数据类型
// 参数
// 返回值
// 函数太灵活了，无所不能
// 一般情况下，把函数作为参数的目的就是为了获取函数内部的异步操作结果
// JavaScript 单线程、事件循环


// console.log(1)

// // setTimeout(f,0)必须要等到当前脚本的所有同步任务结束后才会执行。异步。
// setTimeout(function () {
//   console.log(2)
//   console.log('hello')
// }, 0)

// console.log(3)

// 结果：1 3 2 hello


// function add(x, y) {
//   console.log(1)
//   setTimeout(function () {
//     console.log(2)
//     var ret = x + y
//     return ret   // 这个 return 属于同步任务
//   }, 1000)
//   console.log(3)
//   // 到这里就执行结束了，不会等到执行前面的定时器，所以直接返回默认值 undefined
// }
// console.log(add(10, 20))

// 结果：1 3 undefined 2

// function add(x, y) {
//   var ret
//   console.log(1)
//   setTimeout(function () {
//     console.log(2)
//     ret = x + y
//   }, 1000)
//   console.log(3)
//   return ret
// }
// console.log(add(10, 20))

// 结果：1 3 undefined 2

// 把回调函数当成参数传进来
// function callback() {
//   console.log("I am in the callback!");
// }

// function work(func) {
//   console.log("I am calling the callback!");
//   func(); 
// }

// work(callback);


function add(x, y, callback) {
  // var x = 10
  // var y = 20
  // var callback = function (ret) { console.log(ret) }
  console.log(1)
  setTimeout(function () {
    console.log(2)
    var ret = x + y
    callback(ret)
  }, 1000)
  console.log(3)
}

add(10, 20, function (ret) {
  console.log(ret)
})

// 结果：1 3 2 30

// 注意：凡是需要得到一个函数内部异步操作的结果
//    setTimeout
//    readFile
//    writeFile
//    ajax
//   这种情况必须通过：回调函数
