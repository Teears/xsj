// pages/cart_shop/cart_shop.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsList:{
      saveHidden:true,//显示隐藏
      allSelect:false,//全选
      noSelect:true,//合计显示隐藏
      list:[
        //{goodsId:1, pic:"15.16", price:"24.89", name:"自然堂", imgs:"jingxuan3.jpg", shopNum:3, num:180, stock:999},
        //{goodsId:2, pic:"32.46", price:"89.23", name:"香奈儿", imgs:"jingxuan15.jpg", shopNum:5, num:15, stock:366},
      ],
      price:0
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    //获取购物车数据
    wx.request({
      url: app.globalData.webJavaserver+'/wx/getbuycar/'+app.globalData.openid,
      header:{
        'content-type':'application/json'
      },
      success(res){
        console.log(res.data)
        var list = "goodsList.list"
        that.setData({
          [list]:res.data
        })
      }
    })
  },
  //去逛逛
  toIndexPage:function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //设置数据列表的函数
  setGoodsList:function(saveHidden,total,allSelect,noSelect,list){
    this.setData({
      goodsList:{
        saveHidden:saveHidden,
        allSelect:allSelect,
        noSelect:noSelect,
        list:list,
        price:total
      }
    })
    var shopCarInfo = {};
    var tempNumber = 0;
    shopCarInfo.shopList = list;
    for(var i=0; i<list.length; i++){
      tempNumber = tempNumber + list[i].shopNum
    }
    shopCarInfo.shopNum = tempNumber;
    wx.setStorage({
      data: shopCarInfo,
      key: 'shopCarInfo',
    })
  },
  //显示隐藏函数
  getSaveHide:function(){
    var saveHidden = this.data.goodsList.saveHidden;
    return saveHidden;
  },
  //计算价格
  totalPrice:function(){
    //获取所有的数据
    var list = this.data.goodsList.list;
    var total = 0;
    for(var i=0; i<list.length; i++){
      var curItem = list[i]
      //console.log(curItem)
      if(curItem.active){
        total += parseFloat(curItem.price) * curItem.shopNum;
      }
    }
    total = parseFloat(total.toFixed(2)) //JS浮点数计算bug,取两位小数精度
    //console.log(total)
    return total
  },
  //全选函数方法
  allSelect:function(){
    var list = this.data.goodsList.list;
    var allSelect = false;
    for(var i=0; i<list.length; i++){
      var curItem = list[i];
      if(curItem.active){
        allSelect = true;
      }else{
        allSelect = false;
        break;//没有就不循环了
      }
    }
    return allSelect;
  },
  //合计显示隐藏
  noSelect:function(){
    var list = this.data.goodsList.list;
    var noSelect = 0;
    for(var i=0; i<list.length; i++){
      var curItem = list[i];
      if(!curItem.active){
        noSelect ++;
      }
    }
    if(noSelect == list.length){
      return true;
    }else{
      return false;
    }
  },
  //全选按钮事件
  bindAllSelect:function(){
    var currentAllSelect = this.data.goodsList.allSelect;
    var list = this.data.goodsList.list;
    if(currentAllSelect){
      for(var i=0; i<list.length; i++){
        var curItem = list[i]
        curItem.active = false;
      }
    }else{
      for(var i=0; i<list.length; i++){
        var curItem = list[i]
        curItem.active = true;
      }
    }
    this.setGoodsList(this.getSaveHide(),this.totalPrice(),!currentAllSelect,this.noSelect(),list)
  },
  //增加
  jiaBtnTap:function(e){
    var index = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset.index)
    var list = this.data.goodsList.list;
    if(index !=="" && index !==null){
      if(list[parseInt(index)].shopNum < Number(list[parseInt(index)].stock)){
        list[parseInt(index)].shopNum ++;
        this.setGoodsList(this.getSaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
      }else{
        wx.showToast({
          title: '仓库存货不多了！请稍等立即存货',
          icon:"none",
          duration:2000
        })
      }
    }
  },
  //减少
  jianBtnTap:function(e){
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(e.currentTarget.dataset)
    var list = this.data.goodsList.list;
    if(index !=="" && index !==null){
      if(list[parseInt(index)].shopNum > 1){
        list[parseInt(index)].shopNum --;
        that.setGoodsList(that.getSaveHide(),that.totalPrice(),that.allSelect(),that.noSelect(),list)
      }else{
        wx.showModal({
          title: '删除',
          content:"是否删除这个商品",
          success(res){
            if(res.confirm){
              console.log("用户删除成功")
              wx.request({
                url: app.globalData.webJavaserver+'/wx/deleteBuycar/'+e.currentTarget.dataset.id,
                header:{
                  "content-type":"application/json"
                },
                success(res){
                  console.log(res.data)
                  that.onLoad()
                }
              })
            }else if(res.cancel){
              console.log("取消删除")
            }
          }
        })
      }
    }
  },
  //清空购物车
  deleteSelected:function(){
    var that = this;
    wx.request({
      url: app.globalData.webJavaserver+'/wx/deleteAllBuycar/'+app.globalData.openid,
      header:{
        "content-type":"application/json"
      },
      success(res){
        console.log(res.data)
        var list = that.data.goodsList.list;
        list = list.filter(function(curgoods){
          return !curgoods.active
        })
        that.setGoodsList(that.getSaveHide(),that.totalPrice(),that.allSelect(),that.noSelect(),list)
      }
    })
  },
  //激活清空按钮
  editTap:function(){
    var list = this.data.goodsList.list;
    for(var i=0; i<list.length; i++){
      var curItem = list[i];
      curItem.active = false;
    }
    this.setGoodsList(!this.getSaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
  },
  //激活清空之后 再次激活完成按钮
  saveTap:function(){
    var list = this.data.goodsList.list;
    for(var i=0; i<list.length; i++){
      var curItem = list[i];
      curItem.active = true;
    }
    this.setGoodsList(!this.getSaveHide(),this.totalPrice(),this.allSelect(),this.noSelect(),list);
  },
  //去结算
  toPayOrder:function(){
    console.log(this.data.goodsList.list)
    wx.navigateTo({
      url: '/pages/payment/payment?listData='+JSON.stringify(this.data.goodsList.list),
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