//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎来到我的首页！',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrls:['/images/index/ban1.jpg', //轮播图图片
      '/images/index/ban2.jpg',
      '/images/index/ban3.jpg',
      '/images/index/ban4.jpg'
    ],
      news:[
        {id:1,data:"02-10",text:"2020五一放假通知"},
        {id:1,data:"02-17",text:"2020春节放假通知"},
        {id:1,data:"03-10",text:"2020元旦活动通知"},
      ],
      boutique:[],
      newest:[],
      hotset:[],
      /*boutique:[//精选数据
        {id:1,imgs:"jingxuan1.jpg",name:"欧诗漫"},
        {id:2,imgs:"jingxuan2.jpg",name:"玉兰油"},
        {id:3,imgs:"jingxuan3.jpg",name:"相宜本草"},
        {id:4,imgs:"jingxuan4.jpg",name:"施华蔻"},
        {id:5,imgs:"jingxuan5.jpg",name:"欧诗漫"},
        {id:6,imgs:"jingxuan6.jpg",name:"欧诗漫"},
      ],
      newest:[//最新产品
        {id:11,imgs:"jingxuan11.jpg",name:"喜马拉雅"},
        {id:12,imgs:"jingxuan12.jpg",name:"玉兰油"},
        {id:13,imgs:"jingxuan13.jpg",name:"相宜本草"},
        {id:14,imgs:"jingxuan14.jpg",name:"施华蔻"},
        {id:15,imgs:"jingxuan15.jpg",name:"欧诗漫"},
        {id:16,imgs:"jingxuan16.jpg",name:"欧诗漫"},
      ],
      hotset:[
        {id:6,imgs:"jingxuan6.jpg",name:"最热的",price:"100",saled:"150"},
        {id:5,imgs:"jingxuan5.jpg",name:"最好的",price:"120",saled:"30"},
        {id:12,imgs:"jingxuan12.jpg",name:"最香的",price:"160",saled:"80"},
        {id:15,imgs:"jingxuan15.jpg",name:"最美的",price:"130",saled:"200"},
        {id:14,imgs:"jingxuan14.jpg",name:"最诱惑的",price:"89",saled:"320"},
        {id:13,imgs:"jingxuan13.jpg",name:"你猜不到的",price:"77",saled:"666"},
      ],*/
  },
  //事件处理函数
  //通过精选推荐到商品详情事件
  toBoutique: function(e) {
    console.log(e)
    //跳转到商品详情页面-跳转到普通页面（非tabbar页面）
    wx.navigateTo({
      url: '/pages/details/details?id='+e.currentTarget.dataset.id,
    })
  },
  //通过最新产品到商品详情事件
  toNewest: function(e) {
    console.log(e)
    //跳转到商品详情页面-跳转到普通页面（非tabbar页面）
    wx.navigateTo({
      url: '/pages/details/details?id='+e.currentTarget.dataset.id,
    })
  },
  //通过热销产品到商品详情事件
  toHotset: function(e) {
    console.log(e.currentTarget.dataset)
    //跳转到商品详情页面-跳转到普通页面（非tabbar页面）
    wx.navigateTo({
      url: '/pages/details/details?id='+e.currentTarget.dataset.id,
    })
  },
  toHotOrder: function() {
    //跳转到销量排行页面-跳转到普通页面（非tabbar页面）
    wx.navigateTo({
      url: '/pages/hot_order/hot_order',
    })
  },

  onLoad: function () {
    //捕获this
    var that = this;
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }

   //获取精选推荐数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/index/recommend',
      header:{
        "content-type":"application/json"
      },
      success(res){
        //console.log(res.data)
        //console.log(that)
        //设置数据
        that.setData({
          boutique:res.data
        })
        //console.log(that.data.boutique[0].id)
      }
    })

     //获取最新产品数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/index/oldest',
      header:{
        "content-type":"application/json"
      },
      success(res){
        //console.log(res.data)
        //设置数据
        that.setData({
          newest:res.data
        })
      }
    })
    
    //获取猜你喜欢数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/index/hot',
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        //设置数据
        that.setData({
          hotset:res.data
        })
      }
    })

  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
