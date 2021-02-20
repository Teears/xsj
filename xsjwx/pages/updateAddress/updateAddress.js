// pages/updateAddress/updateAddress.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userValue:"",//收货人保存的点 的值
    addressValue:"",//选择地址的值
    phoneValue:"",//联系电话的值
    switchValue:0,//开关的值
    id:"",
  },

  //获取保存的点的值
  userValue:function(e){
    //console.log(e)
    this.setData({
      userValue:e.detail.value
    })
  },
  //选择收货地址的值
  addressValue:function(e){
    //console.log(e)
    this.setData({
      addressValue:e.detail.value
    })
  },
  //获取联系电话的值
  phoneValue:function(e){
    //console.log(e)
    this.setData({
      phoneValue:e.detail.value
    })
  },
  //开关
  switchChange:function(e){
    console.log(e)
    var values = e.detail.value == true ? 1 : 0;
    this.setData({
      switchValue:values
    })
  },
  //修改地址
  sendBtn:function(){
    var that = this;
    var switchvalue = that.data.switchValue == true? 1:0;
    //判断输入的值不能为空
    if(that.data.userValue != "" && that.data.textareaValue != "" && that.data.phoneValue != "" && that.data.addressValue != ""){
     //后台处理逻辑
      wx.request({
        method:"POST",
        url:app.globalData.webJavaserver+'/wx/address/update',
        data:{
          title:that.data.userValue,
          phone:that.data.phoneValue,
          address:that.data.addressValue,
          isdefault:switchvalue,
          openid:app.globalData.openid,
          id:that.data.id
        },
        header:{
          "content-type":"application/json"
        },
        success(res){
          //添加成功后跳转到我的地址页面
          wx.navigateTo({
            url: '/pages/address/address',
          })
        }
      })
    }else{
      wx.showToast({
        title: '输入的值不能为空',
        icon:"none",
        duration:2000
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    //获取携带过来的数据
    var data = JSON.parse(e.dataall)
    console.log(data)
    //把获取的数据赋值给表单
    var start = data.isdefault == 1? true:false;
    that.setData({
      userValue:data.title,
      phoneValue:data.phone,
      addressValue:data.address,
      switchValue:start,
      id:data.id,
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