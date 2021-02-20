// pages/collection/collection.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionList:[],
    /*collectionList:[
      {collectionDate:"2020-06-08 14:17:05",goodsId:"1",id:"29",imgs:"../../images/index/jingxuan1.jpg",name:"欧诗漫.补水面膜贴21片",num:"210",price:"25.00",stock:"1300"},
      {collectionDate:"2020-06-08 13:14:35",goodsId:"2",id:"1",imgs:"../../images/index/jingxuan2.jpg",name:"Olay玉兰油护肤套装",num:"567",price:"350.00",stock:"56"},
      {collectionDate:"2020-06-08 15:28:56",goodsId:"3",id:"9",imgs:"../../images/index/jingxuan3.jpg",name:"自然堂补水保湿修复乳",num:"20",price:"260.00",stock:"360"},
      {collectionDate:"2020-06-08 12:23:15",goodsId:"4",id:"4",imgs:"../../images/index/jingxuan4.jpg",name:"Olay淡斑小白瓶X-Pro美白精华",num:"380",price:"265.00",stock:"780"},
      {collectionDate:"2020-06-08 11:52:47",goodsId:"5",id:"6",imgs:"../../images/index/jingxuan5.jpg",name:"佰草集补水套装",num:"1300",price:"185.00",stock:"89"},
    ]*/
    
   
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取收藏数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/getcollection/'+app.globalData.openid,
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          collectionList:res.data
        })
      }
    })
  },
  //删除收藏
  deleteCollection:function(e){
    var that = this;
    //console.log(e.currentTarget.dataset.id)
    //确认删除
    wx.showModal({
      title: '删除',
      content: '确认删除',
      success(res){
        console.log(res)
        if(res.confirm){
          console.log("删除成功")
          wx.request({
            url: app.globalData.webJavaserver+'/wx/delcollection/'+e.currentTarget.dataset.id,
            header:{
              "content-type":"application/json"
            },
            success(res){
              console.log(res.data)
              //刷新页面
              that.onLoad()
            }
          })
        }else if(res.cancel){
          console.log("取消删除")
        }
      }
    })
  },
  //返回个人中心
  toMine:function(){
    wx.switchTab({
      url: '/pages/mine/mine',
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