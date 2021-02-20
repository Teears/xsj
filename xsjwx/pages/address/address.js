// pages/address/address.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:[],
    userInfo:[],
    openid:null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    if(app.globalData.userInfo){
      this.setData({
        userInfo:app.globalData.userInfo
      })
    }else{
      wx.getUserInfo({
        success:res=>{
          app.globalData.userInfo=res.userInfo;
          this.setData({
            userInfo:app.globalData.userInfo
          })
        },
      })
    }
    //console.log(that)
    if(that.data.userInfo){
      wx.login({
        success:(res)=>{
          //console.log(res.code)
          //获取openId
          wx.request({
            url: app.globalData.webJavaserver+'/wxlogin/login?code='+res.code+"&nickname="+that.data.userInfo.nickName,
            header:{
              "content-type":"application/json"
            },
            success(res){
              app.globalData.openid = res.data;
              //console.log(app.globalData.openid)
              //获取所有地址数据
              wx.request({
                url: app.globalData.webJavaserver+'/wx/getaddr/'+app.globalData.openid,
                header:{
                  "content-type":"application/json"
                },
                success(res){
                  //console.log(res.data)
                  that.setData({
                    address:res.data
                  })}})
            }
          })
        }
      })
    }
  },

  //返回个人中心
  toMine:function(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  //删除地址数据
  deleteAddress:function(e){
    var that = this;
    //console.log(e.currentTarget.dataset.id)
    wx.showModal({
      title: '删除',
      content:"确认删除？",
      success(res){
        if(res.confirm){
          console.log("删除成功")
          wx.request({
            url: app.globalData.webJavaserver+'/wx/deleteAddr/'+e.currentTarget.dataset.id,
            header:{
              "content-type":"application/json"
            },
            success(res){
              that.onLoad();
            }
          })
        }else if(res.cancel){
          console.log("取消删除")
        }
      }
    })
  },
  //到新增地址页面
  toAddAddress:function(){
    wx.navigateTo({
      url: '/pages/newAddress/newAddress',
    })
  },
  //修改地址数据
  updateAddress:function(e){
    wx.navigateTo({
      url: '/pages/updateAddress/updateAddress?dataall='+JSON.stringify(e.currentTarget.dataset.dataall),
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