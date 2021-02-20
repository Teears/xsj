// pages/hot_order/hot_order.js
const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotorder:[],
  },

  toHotorder:function(e){
    console.log(e.currentTarget.dataset)
    //跳转到商品详情
    wx.navigateTo({
      url:'/pages/details/details?id='+e.currentTarget.dataset.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    wx.request({
      url: app.globalData.webJavaserver+'/wx/getMostProduct',
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          hotorder:res.data
        })
      }
    }) 
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