// pages/updata/updata.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  //添加
  res: function (e) {
    if (e.detail.value.rubbishname === "") {
      wx.showToast({
        icon: 'none',
        title: '请输入垃圾名称!'
      })
    } else if (e.detail.value.category === "") {
      wx.showToast({
        icon: 'none',
        title: '请输入垃圾类型!'
      })
    } else {
      const db = wx.cloud.database()
      db.collection('garbagedata').add({
        data: {
          name: e.detail.value.rubbishname,
          category: e.detail.value.category,
          _count:0
        },
        success: res => {
          // 在返回结果中会包含新创建的记录的 _id
          wx.showToast({
            title: '新增记录成功',
          })
        },
        fail: err => {
          wx.showToast({
            icon: 'none',
            title: '新增记录失败'
          })
        }
      })
    }
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