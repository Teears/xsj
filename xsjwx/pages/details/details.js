// pages/details/details.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList:[],
    collectionId:"",
    imgUrls:[],//商品轮播图地址
    name:"",//商品名字
    price:"",//商品单价
    title:"",//商品标题
    stock:"",//商品库存
    number:"",//累计购买
    shopId:"",//商品ID
    carNum:0,//购物车默认数量
    discountPrice:"0.00",//会员价格
    totalPrice:0.00,//总价格
    active:false,//判断是否收藏
    indicatorDots:true,
    autoplay:true,
    interval:5000,
    duration:1000,
    circular:true,
    curIndex:0,//默认tab初始切换下标
    hideShopPopup:true,//是否显示下面的购买框
    buyNumber:0,//默认购买商品数量
    buyNumMin:0,//默认最小购买商品数量
    shopImgUrl:"",//商品地址
    shopType:"addShopCar"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (e) {
    //console.log(e)
    var that = this;
    //根据ID获取相应商品数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/detail/'+e.id,
      header:{
        'content-type':'application/json'
      },
      success(res){
        var listData = res.data
        console.log(res.data)
        that.setData({
          name:listData.product.name,
          price:listData.product.price,
          discountPrice:(listData.product.price*0.98).toFixed(2),
          title:listData.product.title,
          stock:listData.product.stock,
          number:listData.product.number,
          shopId:listData.product.id,
          shopImgUrl:listData.product.imgs,
          imgUrls:listData.imgs,
        })
        //获取收藏的数据判断该数据是否存在
        wx.request({
          url: app.globalData.webJavaserver+'/wx/getcollection/'+app.globalData.openid,
          header:{
            'content-type':'application/json'
          },
          success(res){
            //console.log(res.data)
            for(var i=0; i<res.data.length;i++){
              if(res.data[i].productid == that.data.shopId){
                that.setData({
                  active:true,
                  collectionId:res.data[i].id,
                })
              }
            }
          }
        })
      }
    })
    //获取购物车数据并设置购物车数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/getbuycar/'+app.globalData.openid,
      header:{
        'content-type':'application/json'
      },
      success(res){ 
        console.log(res.data)
        that.setData({
          carNum:res.data.length
        })
      }
    })
  },

  //Tab切换
  bindTap:function(e){
    const index = parseInt(e.currentTarget.dataset.index)
    this.setData({
      curIndex:index
    })
  },
  //隐藏框出现
  bindGuiGeTap:function(){
    this.setData({
      hideShopPopup:false
    })
  },
  //隐藏框关闭
  closePopupTap:function(){
    this.setData({
      hideShopPopup:true
    })
  },
  //加入购物车
  toAddShopCar:function(){
    this.setData({
      shopType:"addShopCar"
    })
    this.bindGuiGeTap();
  },
  //点击购物车图标去到购物车界面
  goShopCar:function(){
    wx.reLaunch({
      url: '/pages/cart_shop/cart_shop',
    })
  },
  //立即购买
  tobuy:function(){
    this.setData({
      shopType:"tobuy"
    })
    this.bindGuiGeTap();
  },
  //点击收藏按钮收藏
  goCollection:function(){
    var that = this;
    var collectionInfo={};
    collectionInfo.productid = this.data.shopId;
    collectionInfo.price = this.data.price;
    collectionInfo.shopImgUrl = this.data.shopImgUrl;
    collectionInfo.stock = this.data.stock;
    collectionInfo.number = this.data.number;
    //根据active的值进行判断是否收藏
    if(!this.data.active){
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        duration:2000,
      })
      //获取现在点击的时间
      function formatTen(num){
        return num>9?(num+""):("0"+num);
      }
      function formatDate(){
        var date = new Date();
        var year = date.getFullYear();
        var month = date.getMonth()+1;
        var day = date.getDate();
        var hour = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year+"-"+formatTen(month)+"-"+formatTen(day)+" "+formatTen(hour)+":"+formatTen(minute)+":"+formatTen(second);
      }
      //console.log(formatDate())
      //添加收藏
      wx.request({
        method:"POST",
        url: app.globalData.webJavaserver+'/wx/addCollection',
        header:{
          'content-type':'application/json'
        },
        data:{
          productid:that.data.shopId,
          openid:app.globalData.openid,
          name:that.data.name,
          stock:that.data.stock,
          price:that.data.price,
          num:that.data.number,
          imgs:that.data.shopImgUrl,
          collecttime:formatDate()
        },
        success(res){
          console.log(res)
        }
      })
      that.setData({
        active:true
      })
    }else{
      wx.showToast({
        title: '取消收藏',
        icon: 'success',
        duration:2000,
      })
      wx.request({
        url: app.globalData.webJavaserver+'/wx/getcollection/'+app.globalData.openid,
        header:{
          'content-type':'application/json'
        },
        success(res){
          //console.log(res.data)
          for(var i=0; i<res.data.length;i++){
            if(res.data[i].productid == that.data.shopId){
              that.setData({
                collectionId:res.data[i].id,
              })
            }
          }
          wx.request({
            url: app.globalData.webJavaserver+'/wx/delcollection/'+that.data.collectionId,
            header:{
              'content-type':'application/json'
            },
            success(res){
              console.log(res)
            }
          })
          that.setData({
            active:false
          })
        }
      })
    }
  },
  //购买数量减
  numJianTap:function(){
    if(this.data.buyNumber > this.data.buyNumMin){
      var currentNum = this.data.buyNumber;
      currentNum--;
      this.setData({
        buyNumber:currentNum,
        totalPrice:(this.data.discountPrice*currentNum).toFixed(2)
      })
    }else{
      wx.showToast({
        title: '已经达到最小值啦',
        icon: "none",
        duration:2000
      })
    }
  },
  //购买数量加
  numJiaTap:function(){
    if(this.data.buyNumber < this.data.stock){
      var currentNum = this.data.buyNumber;
      currentNum++;
      this.setData({
        buyNumber:currentNum,
        totalPrice:(this.data.discountPrice*currentNum).toFixed(2)
      })
    }else{
      wx.showToast({
        title: '已经达到最大值啦',
        icon: "none",
        duration:2000
      })
    }
  },
  //隐藏框的加入购物车
  addShopCar:function(){
    var that = this;
    //判断购物车不能为0
    if(that.data.buyNumber < 1){
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel:false
      })
    }else{
      //获取购物车信息
      var shopCarInfo = that.buildShopCarInfo();
      console.log(shopCarInfo.shopList)
      //把购物车数据添加到数据库
      wx.request({
        method:"POST",
        url: app.globalData.webJavaserver+'/wx/addBuycar',
        data:{
          openid:app.globalData.openid,
          productid:shopCarInfo.shopList[0].shopId,
          name:shopCarInfo.shopList[0].name,
          stock:shopCarInfo.shopList[0].stock,
          price:Number(shopCarInfo.shopList[0].price),
          num:shopCarInfo.shopList[0].num,
          imgs:shopCarInfo.shopList[0].shopImgUrl,
          shopNum:shopCarInfo.shopList[0].shopNum,
        },
        header:{
          'Content-Type': 'application/json'
        },
        success(res){
          console.log(res.data)
          that.setData({
            carNum:that.data.carNum + 1
          })
        }
      })
      //写入本地缓存
      wx.setStorage({
        data: shopCarInfo,
        key: 'shopCarInfo',
      })
      that.closePopupTap();
      wx.showToast({
        title: '加入购物车成功',
        icon:"success",
        duration:2000
      })
    }
    
  },
  //组件购物车信息
  buildShopCarInfo:function(){
    //加入购物车信息
    var shopCarMap ={};
    shopCarMap.shopId = this.data.shopId;
    shopCarMap.price = this.data.totalPrice;
    shopCarMap.name = this.data.name;
    shopCarMap.shopImgUrl = this.data.shopImgUrl;
    shopCarMap.shopNum = this.data.buyNumber;
    shopCarMap.stock = this.data.stock;
    shopCarMap.num = this.data.number;
    var shopCarInfo ={};
    if(!shopCarInfo.shopList){
      shopCarInfo.shopList=[];
    }
    shopCarInfo.shopList.push(shopCarMap);
    return shopCarInfo;
  },

  //隐藏框的立即购买
  buyNow:function(){
    var that = this;
    //判断购物车不能为0
    if(that.data.buyNumber < 1){
      wx.showModal({
        title: '提示',
        content: '购买数量不能为0！',
        showCancel:true
      })
    }else{
      //获取购物车信息
      var buyNowInfo = that.buildBuyNowInfo();
    
      //写入本地缓存
      wx.setStorage({
        data: buyNowInfo,
        key: 'buyNowInfo',
      })
      that.closePopupTap();
      
      //去到付款界面
      wx.navigateTo({
        url: '/pages/payment/payment?data='+JSON.stringify(buyNowInfo),
      })
    }
    
  },
  //组件购买信息
  buildBuyNowInfo:function(){
    //加入购买信息
    var buyNowMap ={};
    buyNowMap.Id = this.data.shopId;
    buyNowMap.price = this.data.discountPrice;
    buyNowMap.name = this.data.name;
    buyNowMap.imgs = this.data.shopImgUrl;
    buyNowMap.shopNum = this.data.buyNumber;
    buyNowMap.stock = this.data.stock;
    buyNowMap.num = this.data.number;
    var buyNowInfo ={};
    if(!buyNowInfo.shopList){
      buyNowInfo.shopList=[];
    }
    buyNowInfo.shopList.push(buyNowMap);
    return buyNowInfo;
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