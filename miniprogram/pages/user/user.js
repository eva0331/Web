// pages/user/user.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 查看是否授权
    wx.getSetting({
      success: function(res) {
        if (res.authSetting['scope.userInfo']) {
          console.log("【已授权】")
          //显示加载界面
          wx.showLoading({
            title: '加载中',
          });
          wx.getUserInfo({
            success: function(res) {
              console.log("【获取用户信息成功】", res.userInfo)
              app.globalData.userInfo = res.userInfo,
                that.setData({
                  userInfo: res.userInfo,
                })
              wx.cloud.callFunction({
                name: 'login',
                data: {},
                success: res => {
                  app.globalData.userOpenid = res.result.openid,
                    console.log('【用户的openid】', res.result.openid)
                  //隐藏加载界面
                  wx.hideLoading();
                },
                fail: err => {
                  console.error('【云函数login调用失败】', err)
                }
              })
            },
            fail: function(res) {
              console.log("【获取用户信息失败】", res)
            }
          });
        } else {
          // 用户没有授权
          console.log("【未授权】")
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },

  bindGetUserInfo: function(e) {
    if (e.detail.userInfo) {
      console.log("【已授权】")
      //显示加载界面
      wx.showLoading({
        title: '加载中',
      });
      var that = this;
      console.log("【用户的信息如下】", e.detail.userInfo);
      app.globalData.userInfo = e.detail.userInfo,
      that.setData({
        isHide: false,
        userInfo: e.detail.userInfo
      });
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.userOpenid = res.result.openid,
            console.log('【用户的openid】', res.result.openid)
          //隐藏加载界面
          wx.hideLoading();
        },
        fail: err => {
          console.error('【云函数login调用失败】', err)
        }
      })
    } else {
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
        showCancel: false,
        confirmText: '返回授权',
        success: function(res) {
          if (res.confirm) {
            console.log('【用户点击了“返回授权”】');
          }
        }
      });
    }
  },

  toHistoryScore: function(e) {
    wx.navigateTo({
      url: '/pages/historyScore/historyScore'
    })
  },

  toUpdata: function(e) {
    if (app.globalData.userOpenid === "oT2985RjnaUNxfxsTJKU1sWHCXm4") {
      wx.navigateTo({
        url: '/pages/updata/updata'
      })
    } else {
      wx.showToast({
        icon: 'none',
        title: '只有开发者才可以上传数据，请联系开发者！'
      })
    }
  },

  toDeveloper: function(e) {
    wx.navigateTo({
      url: '/pages/developer/developer'
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