// pages/orders/orders.js
const app = getApp();
var time = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    curIndex:0,
    ordersListpay:[],
    ordersListrece:[],
    ordersListover:[],
    /*ordersList:[
      {address:"四川省成都市锦江区朱雀城", id:"1", imgs:"jingxuan5.jpg", name:"自然堂补水面膜2片", num:"27", phone:"199XXXXXXXX", price:"99", shopNum:"1", stock:"300"},
      {address:"四川省成都市锦江区玄虎城", id:"2", imgs:"jingxuan6.jpg", name:"SKII面膜2片", num:"68", phone:"155XXXXXXXX", price:"299", shopNum:"1", stock:"399"},
      {address:"四川省成都市锦江区花垣城", id:"3", imgs:"jingxuan15.jpg", name:"韩束面膜2片", num:"99", phone:"156XXXXXXXX", price:"45", shopNum:"2", stock:"299"},
    ],*/
    //三个数据表



  },
  //头部导航切换
  bindTap:function(e){
    //console.log(e.currentTarget.dataset.index)
    //parseInt转化为整型
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex:index
    })
  },
  //返回首页
  toindex:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //返回个人中心
  tomine:function(){
    wx.switchTab({
      url: '/pages/mine/mine',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    var that = this;
    if(e.curIndex){
      that.setData({
        curIndex:Number(e.curIndex)
      })
    }
   //获取待付款数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/orders/ispay',
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        that.setData({
          ordersListpay:res.data
        })
      }
    }) 
    //获取待发货数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/orders/receive',
      header:{
        "content-type":"application/json"
      },
      success(res){
        //console.log(res.data)
        that.setData({
          ordersListrece:res.data
        })
      }
    })
    //获取待收货数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/orders/over',
      header:{
        "content-type":"application/json"
      },
      success(res){
        that.setData({
          ordersListover:res.data
        })
      }
    })
  },

  //去付款
  updateIspay:function(e){
    var that = this;
    //console.log(e.currentTarget.dataset.id)
    //确认支付
    wx.showModal({
      title: '支付',
      content: '确认支付',
      success(res){
        //console.log(res)
        if(res.confirm){
          console.log("支付成功")
          wx.request({
            url: app.globalData.webJavaserver+'/wx/orders/ispay/'+e.currentTarget.dataset.id,
            header:{
              "content-type":"application/json"
            },
            success(res){
              //console.log(res.data)
              //刷新页面
              that.onLoad(1)
            }
          })
        }else if(res.cancel){
          console.log("取消支付")
        }
      }
    })
  },

  //取消订单
  cancelOrders:function(e){
    var that = this;
    //console.log(e.currentTarget.dataset.id)
    //确认取消
    wx.showModal({
      title: '删除',
      content: '确认删除订单',
      success(res){
        //console.log(res)
        if(res.confirm){
          console.log("删除成功")
          wx.request({
            url: app.globalData.webJavaserver+'/wx/orders/cancel/'+e.currentTarget.dataset.id,
            header:{
              "content-type":"application/json"
            },
            success(res){
              //console.log(res.data)
              //刷新页面
              that.onLoad(0)
            }
          })
        }else if(res.cancel){
          console.log("取消删除")
        }
      }
    })
  },

  //确认收货
  overOrders:function(e){
    var that = this;
    console.log(e.currentTarget.dataset.id)
    //确认收货
    wx.showModal({
      title: '收货',
      content: '确认收货',
      success(res){
        //console.log(res)
        if(res.confirm){
          console.log("收货成功")
          wx.request({
            url: app.globalData.webJavaserver+'/wx/orders/over/'+e.currentTarget.dataset.id,
            header:{
              "content-type":"application/json"
            },
            success(res){
              //console.log(res.data)
              //刷新页面
              that.onLoad(2)
            }
          })
        }else if(res.cancel){
          console.log("收货失败")
        }
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