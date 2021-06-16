// pages/test/test.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isHide: true,
    index: 0,
    score: 0,
    question: []
  },

  answerClickA: function () {
    var string = 'question[' + this.data.index + ']'
    this.setData({
      [string]: {
        name: this.data.question[this.data.index].name,
        rightAnswer: this.data.question[this.data.index].rightAnswer,
        answer: "可回收物"
      }
    })
    if (this.data.question[this.data.index].rightAnswer === "可回收物") {
      console.log("【正确】")
      this.setData({
        score: this.data.score + 10
      })
      var string = 'question[' + this.data.index + ']'
      this.setData({
        [string]: {
          name: this.data.question[this.data.index].name,
          rightAnswer: "✔",
          answer: "可回收物"
        }
      })
    } else {
      console.log("【错误】")
    }
    this.setData({
      index: this.data.index + 1,
    })
    if (this.data.index == 10) {
      this.setData({
        isHide: false
      })
    }
  },

  answerClickB: function () {
    var string = 'question[' + this.data.index + ']'
    this.setData({
      [string]: {
        name: this.data.question[this.data.index].name,
        rightAnswer: this.data.question[this.data.index].rightAnswer,
        answer: "湿垃圾"
      }
    })
    if (this.data.question[this.data.index].rightAnswer === "湿垃圾") {
      console.log("【正确】")
      this.setData({
        score: this.data.score + 10
      })
      var string = 'question[' + this.data.index + ']'
      this.setData({
        [string]: {
          name: this.data.question[this.data.index].name,
          rightAnswer: "✔",
          answer: "湿垃圾"
        }
      })
    } else {
      console.log("【错误】")
    }
    this.setData({
      index: this.data.index + 1,
    })
    if (this.data.index == 10) {
      this.setData({
        isHide: false
      })
    }
  },

  answerClickC: function () {
    var string = 'question[' + this.data.index + ']'
    this.setData({
      [string]: {
        name: this.data.question[this.data.index].name,
        rightAnswer: this.data.question[this.data.index].rightAnswer,
        answer: "有害垃圾"
      }
    })
    if (this.data.question[this.data.index].rightAnswer === "有害垃圾") {
      console.log("【正确】")
      this.setData({
        score: this.data.score + 10
      })
      var string = 'question[' + this.data.index + ']'
      this.setData({
        [string]: {
          name: this.data.question[this.data.index].name,
          rightAnswer: "✔",
          answer: "有害垃圾"
        }
      })
    } else {
      console.log("【错误】")
    }
    this.setData({
      index: this.data.index + 1,
    })
    if (this.data.index == 10) {
      this.setData({
        isHide: false
      })
    }
  },

  answerClickD: function () {
    var string = 'question[' + this.data.index + ']'
    this.setData({
      [string]: {
        name: this.data.question[this.data.index].name,
        rightAnswer: this.data.question[this.data.index].rightAnswer,
        answer: "干垃圾"
      }
    })
    if (this.data.question[this.data.index].rightAnswer === "干垃圾") {
      console.log("【正确】")
      this.setData({
        score: this.data.score + 10
      })
      var string = 'question[' + this.data.index + ']'
      this.setData({
        [string]: {
          name: this.data.question[this.data.index].name,
          rightAnswer: "✔",
          answer: "干垃圾"
        }
      })
    } else {
      console.log("【错误】")
    }
    this.setData({
      index: this.data.index + 1,
    })
    if (this.data.index == 10) {
      this.setData({
        isHide: false
      })
    }
  },

  doClick: function () {
    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    const db = wx.cloud.database()
    that.setData({
      index: 0,
      score: 0,
      isHide: true
    })
    db.collection('garbagedata').aggregate().sample({
      size: 10
    }).end().then(res => {
      for (var i = 0; i < 10; i++) {
        var string = 'question[' + i + ']'
        that.setData({
          [string]: {
            name: res.list[i].name,
            rightAnswer: res.list[i].category,
            answer:null
          }
        })
      }
      console.log(that.data.question)
      //隐藏加载界面
      wx.hideLoading();
    })
  },

  doClickX: function () {
    let that = this;
    const db = wx.cloud.database()
    if (app.globalData.userInfo !== "" && app.globalData.userOpenid !== null) {
      //获取当前时间戳  
      var timestamp = Date.parse(new Date());
      timestamp = timestamp / 1000;
      //获取当前时间  
      var n = timestamp * 1000;
      var date = new Date(n);
      var Y = date.getFullYear();
      var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
      var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
      var h = date.getHours();
      var m = date.getMinutes();
      var s = date.getSeconds();
      console.log("【当前时间】" + Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s);
      var d = Y + "-" + M + "-" + D + " " + h + ":" + m + ":" + s;
      db.collection('user').add({
        data: {
          username: app.globalData.userInfo.nickName,
          time: d,
          score: that.data.score
        },
        success: res => {
          console.log('【数据库新增记录成功，记录_id】', res._id)
          wx.showToast({
            title: '记录成功！'
          })
        },
        fail: err => {
          console.error('【数据库新增记录失败】', err)
        }
      })
    }else{
      wx.showToast({
        title: '请先进入【我的】授权登录！',
        icon: 'none'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    const db = wx.cloud.database()
    db.collection('garbagedata').aggregate().sample({
      size: 10
    }).end().then(res => { 
      for (var i = 0; i < 10; i++) {
        var string = 'question[' + i + ']'
        that.setData({
          [string]: {
            name: res.list[i].name,
            rightAnswer: res.list[i].category,
            answer: null
          }
        })
      }
      console.log(that.data.question)
      //隐藏加载界面
      wx.hideLoading();
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})