// miniprogram/pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //输入的内容
    inputTxt: null,
    //常用的分类
    kindList: [],
    //热门搜索
    hotSearchItems: [],
    //搜索到的所有项目
    searchItmes: [],
    //选择搜索到的项目
    selectItem: {},
    //扫描到的物品
    scanItems: [],
    //百度Token
    baiduToken: null,
    //是否隐藏详细信息弹框
    isHiddenInfoModal: true,
    isHiddenEditModal: true,
    //是否隐藏扫描物品的弹窗
    isHiddenScanModal: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.setData({
      kindList: getApp().globalData.kindList,
    });
    this.onPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.setData({
      inputTxt: null,
      searchItmes: []
    });
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {
    var that = this;
    if (that.data.inputTxt) {
      wx.stopPullDownRefresh();
      return;
    }
    that.setData({
      hotSearchItems: []
    })
    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });

    //搜索数据库
    const db = wx.cloud.database()
    db.collection('garbagedata').orderBy('_count', 'desc').limit(20).get({
      success: res => {
        console.log("【热搜项目】", res)
        that.setData({
          hotSearchItems: res.data
        })
        wx.stopPullDownRefresh()
        //隐藏加载界面
        wx.hideLoading();
      }
    })
  },

  //获取输入的搜索内容
  getInput: function(e) {
    if (e.detail.value == "") {
      this.setData({
        inputTxt: null
      })
    } else {
      this.setData({
        inputTxt: e.detail.value
      })
    }
  },

  //点击搜索按钮
  doClick: function(event) {
    var that = this;
    //判断输入的内容是否有效
    if (that.data.inputTxt == null) {
      wx.showToast({
        title: '请输入有效内容！',
        icon: 'none'
      })
      return;
    }

    //清空历史搜索项
    that.setData({
      searchItmes: []
    })

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });

    console.log("【搜索】", that.data.inputTxt);

    //搜索数据库
    const db = wx.cloud.database()
    db.collection('garbagedata').where({
      //使用正则查询，实现对搜索的模糊查询
      name: db.RegExp({
        regexp: that.data.inputTxt,
        //从搜索栏中获取的value作为规则进行匹配。
        options: 'i',
        //大小写不区分
      })
    }).get({
      success: res => {
        if (res.data.length == 0) {
          wx.showToast({
            title: '未收录，请联系开发者！',
            icon: 'none'
          })
          return;
        } else {
          console.log("【结果】", res)
          that.setData({
            searchItmes: res.data
          })
        }
      }
    })
    wx: wx.hideLoading();
  },

  //选择项目
  doClickItem: function(event) {
    var that = this;
    console.log("【选择的项目】", event)
    var _type = event.currentTarget.dataset.type;
    var _name = event.currentTarget.dataset.name;
    var _id = event.currentTarget.id;
    console.log("【选择的ID】", _id)

    //增加搜索数目  
    wx.cloud.callFunction({
      name: 'inc',
      data: {
        id: _id
      },
      success: function (res) {
        console.log("【增加热搜次数】", res)
      }
    })

    for (var i = 0; i < that.data.kindList.length; i++) {
      if (that.data.kindList[i].text == _type) {
        //显示详细信息
        var itemInfo = {
          _txt: _name,
          _type: that.data.kindList[i]
        }
        that.setData({
          selectItem: itemInfo,
          isHiddenInfoModal: false
        })
        console.log("【详细】", that.data.selectItem)
        return;
      }
    }
  },

  //点击热门搜索
  doClickHotItem: function(event) {
    console.log("【点击热门搜索】", event)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })

    //开始搜索
    this.doClick(null);
  },

  //点击拍照按钮
  doClickCamera: function() {
    var that = this;

    //复位扫描的项目
    that.setData({
      scanItems: null
    })

    //首先授权相机的使用
    that.checkAuth().then(res => {
      
      //获取BaiduTaken
      if (!that.baiduToken) {
        that.getBaiduTaken();
      }

      that.getImage().then(res => {
        var filePaht = res.tempFilePaths[0];
        console.log("【获取图片地址】", filePaht)

        wx.getFileSystemManager().readFile({
          filePath: filePaht,
          encoding: "base64",
          success: res => {
            console.log("【读取图片数据成功】")

            //扫描图片物品
            that.scanImageInfo(res.data).then(res => {
              console.log("【扫描图片物品】", res)

              that.setData({
                scanItems: res.data.result
              })

              if (that.data.scanItems) {
                that.setData({
                  isHiddenScanModal: false
                })
              } else {
                wx.showToast({
                  title: '没有识别到物品！',
                  icon: 'none'
                })
              }
            })
          },
          fail: res => {
            console.log("【读取图片数据失败】", res)
            wx.showToast({
              title: '读取图片数据失败！',
              icon: 'none'
            })
          }
        })
      })
    })
  },

  //获取百度taken
  getBaiduTaken: function() {
    const tokenUrl = `https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id=9cGeoG7TxY4ubaIHK9cP16He&client_secret=WHdh3HNLYBxjlOXY4vAnd48MNkQRWcDh&`;

    var that = this;
    wx.request({
      url: tokenUrl,
      method: 'POST',
      dataType: "json",
      header: {
        'content-type': 'application/json; charset=UTF-8'
      },
      success: function(res) {
        console.log("【getBaiduTaken提示pass】", res);
        that.setData({
          baiduToken: res.data.access_token
        })
      },
      fail: function(res) {
        console.log("【getBaiduTaken提示fail】", res);
      }
    })
  },

  //获取本地图片
  getImage: function() {
    var that = this;
    // 选择图片
    return new Promise(function(resolve, reject) {
      wx.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['album', 'camera'],
        success: resolve,
        fail: reject
      })

    })
  },

  //拍照暂无使用
  takeImage: function() {
    const ctx = wx.createCameraContext()

    return new Promise(function(resolve, reject) {
      ctx.takePhoto({
        quality: 'high',
        success: (res) => {
          console.log("【拍照成功】", res)
          resolve(res)
        },
        fail: res => {
          console.log("【拍照失败】", res)
          reject(res)
        }
      })
    })
  },

  //判断是否已经授权
  checkAuth: function() {
    return new Promise(function(resolve, reject) {

      wx.getSetting({
        success: res => {
          if (!res.authSetting['scope.camera']) {
            wx.authorize({
              scope: 'scope.camera',
              success: res => {
                console.log("【用户同意授权拍照】")
                resolve(res)
              },
              fail: res => {
                console.log("【用户拒绝授权拍照】")
                wx.showToast({
                  title: '需要右上角设置中授权',
                  icon: 'none'
                })
                reject(res)
              }
            })
          } else {
            resolve(res)
            console.log("【用户已经授权拍照】")
          }
        },
        fail: reject
      })
    })
  },

  //扫描图片中的数据
  scanImageInfo: function(imageData) {
    var that = this;
    const detectUrl = `https://aip.baidubce.com/rest/2.0/image-classify/v2/advanced_general?access_token=${that.data.baiduToken}`;

    //显示加载界面
    wx.showLoading({
      title: '加载中',
    });

    return new Promise(function(resolve, reject) {
      wx.request({
        url: detectUrl,
        data: {
          image: imageData
        },
        method: 'POST',
        dataType: "json",
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: resolve,
        fail: reject,
        complete: res => {
          //隐藏加载界面
          wx.hideLoading()
        }
      })
    })
  },

  //点击关闭弹窗详细信息
  modal_hidden: function() {
    this.setData({
      isHiddenInfoModal: true,
      isHiddenScanModal: true
    })
  },

  //点击扫描识别的项目
  doClickScanItem: function(event) {
    this.setData({
      isHiddenScanModal: true
    })
    console.log("【选择的物品】", event.currentTarget.dataset.name)

    this.setData({
      inputTxt: event.currentTarget.dataset.name
    })

    //开始搜索
    this.doClick(null);
  },

  //点击扫描弹窗确定
  scanModal_confirm: function(event) {
    this.setData({
      isHiddenInfoModal: true,
      isHiddenScanModal: true
    })
  }
})