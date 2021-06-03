// pages/historyScore/historyScore.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scoreList:[],
    max : 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });
    let that = this;
    const db = wx.cloud.database()
    db.collection('user').where({
      _openid: app.globalData.userOpenid
    }).get({
      success: res => {
        console.log("【获取数据】", res)
        for (var i = 0; i < res.data.length; i++) {
          var string = 'scoreList[' + i + ']'
          that.setData({
            [string]: {
              time: res.data[i].time,
              score: res.data[i].score
            }
          })
        }
        console.log(that.data.scoreList)
        that.setData({
          max: that.data.scoreList[0].score
        })
        for (var i = 1; i < that.data.scoreList.length; i++) {
          if (that.data.scoreList[i].score > that.data.max) {
            that.setData({
              max: that.data.scoreList[i].score
            })
          }
        }
        //隐藏加载界面
        wx.hideLoading();
      }
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})