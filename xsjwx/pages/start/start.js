// pages/start/start.js
//获取实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {},
    canIUse: wx.canIUse('button.open-type.getUserInfo')
 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
          })
        }
      })
    }
  },
  //点击按钮获取用户信息
  getUserInfo:function(e){
    app.globalData.userInfo = e.detail.userInfo
    //console.log(e.detail.userInfo)
    if(e.detail.userInfo){
      wx.login({
        success:(res)=>{
          console.log(res.code)
          //获取openId
          wx.request({
            url: app.globalData.webJavaserver+'/wxlogin/login?code='+res.code+"&nickname="+e.detail.userInfo.nickName,
            header:{
              "content-type":"application/json"
            },
            success(res){
              app.globalData.openid = res.data;
              console.log(app.globalData.openid)
              wx.switchTab({
                url: '/pages/index/index',
              })
            }
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content:"你将无法正常使用小程序"
      })
    }
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