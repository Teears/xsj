// pages/newAddress/newAddress.js
const app = getApp();
const common = require("../../utils/cityArray")
const arrays = common.getAreaInfo();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userValue:"",//收货人保存的点 的值
    addressValue:"",//选择地址的值
    phoneValue:"",//联系电话的值
    textareaValue:"",//详细地址的值
    switchValue:0,//开关的值
    citysIndex:[0,0,0]//给一个初始索引 省 市 区（0 0 0）
  },
  //获取保存的点的值
  userValue:function(e){
    //console.log(e)
    this.setData({
      userValue:e.detail.value
    })
  },
  //选择地址的值
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
  //获取详细地址的值
  textareaValue:function(e){
    //console.log(e)
    this.setData({
      textareaValue:e.detail.value
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
  //保存地址
  saveAddress:function(){
    //console.log(app.globalData.openid)
    var that = this;
    var user ={
      userValue:that.data.userValue,
      phoneValue:that.data.phoneValue,
      textareaValue:that.data.textareaValue,
      switchValue:that.data.switchValue,
      addressValue:that.data.addressValue,
    }
    console.log(user)
    //判断输入的值不能为空
    if(that.data.userValue != "" && that.data.textareaValue != "" && that.data.phoneValue != "" && that.data.addressValue != ""){
     //后台处理逻辑
      wx.request({
        method:"POST",
        url:app.globalData.webJavaserver+'/wx/address/add',
        data:{
          title:that.data.userValue,
          phone:that.data.phoneValue,
          address:that.data.addressValue + that.data.textareaValue,
          isdefault:that.data.switchValue,
          openid:app.globalData.openid
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

      /*//前台处理逻辑
      //判断原有的地址是否有默认值
      if(that.data.switchValue == 1){
        //请求数据库数据
        wx.request({
          url: '/wx',
          header:{
            "content-type":"application/json"
          },
          success(res){
            var dataId = res.data.data;;
            var id ="";
            //获取默认地址的原始数据id
            for(var i=0; i<dataId.length; i++){
              if(dataId[i].isdefault == 1){
                id = dataId[i].id;
                break;
              }
            }

          }
        })
      }else{
        wx.request({
          method:"POST",
          url:app.globalData.webJavaserver+'/wx/address/add',
          data:{
            title:that.data.userValue,
            phone:that.data.phoneValue,
            address:that.data.addressValue + that.data.textareaValue,
            isdefault:0,
            openid:app.globalData.openid
          },
          header:{
            "content-type":"application/x-www-form-urlencoded"
          },
          success(res){
            //添加成功后跳转到我的地址页面
            wx.navigateTo({
              url: '/pages/address/address',
            })
          }
        })
      }*/
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
  onLoad: function (options) {
    //console.log(arrays)
    var that = this;
    if(wx.getStorageSync('global_cityData')){
      var cityArray = wx.getStorageSync('global_cityData')
      //console.log(0)
    }else{
      //console.log(1)
      //定义三列空数组
      var cityArray =[
        [],
        [],
        []
      ];
      for(let i=0, len=arrays.length; i<len; i++){
        //level为1表示省，2表示市，3表示区
        switch(arrays[i]['level']){
          case 1:
            //第一列
            cityArray[0].push(arrays[i]["name"]);
            break;
          case 2:
            //第二列（默认由第一列第一个关联）
            if(arrays[i]["sheng"] == arrays[0]["sheng"]){
              cityArray[1].push(arrays[i]["name"]);
            }
            break;
          case 3:
            //第三列（默认由第一列第一个，第二列第一个关联)
            if(arrays[i]["sheng"] == arrays[0]["sheng"] && arrays[i]["di"] == arrays[1]["di"]){
              cityArray[2].push(arrays[i]["name"]);
            }
            break;
        }
      }
      //console.log(cityArray)
      wx.setStorageSync('global.cityData', cityArray)
    }
    that.setData({
      cityArray:cityArray
    })
  },
  //点击确定获取第一列 第二列 第三列 第一条数据
  func_changeCitysChange:function(e){
    //console.log(e)
    var that = this;
    var cityArray = that.data.cityArray;
    var address = "";
    if(that.data.ssq == undefined){
      var citysIndex = that.data.citysIndex;
      for(let i in citysIndex){
        address += cityArray[i][citysIndex[i]]
      }
    }else{
      address = that.data.ssq
    }
    //console.log(address)
    that.setData({
      addressValue:address
    })
  },
  //选择 省 市 区 并输出
  func_changeCitysChangeColumn:function(e){
    var that = this;
    var cityArray = that.data.cityArray
    var list1 =[];//存放第二列数据 市的列
    var list2 =[];//存放第三列数据 区的列
    var citysIndex=[];
    //主要是注意地址文件中的字段关系，省 市 区关联的字段是sheng di level
    switch(e.detail.column){
      case 0:
        //滑动左列 第一列（省）
        for(let i=0, len = arrays.length; i<len; i++){
          if(arrays[i]["name"] == cityArray[0][e.detail.value]){
            
            var sheng = arrays[i]["sheng"]
          }
          if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 2){
            list1.push(arrays[i]["name"]);
          }
          if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 3 && arrays[i]["di"] == arrays[1]["di"]){
            list2.push(arrays[i]["name"]);
          }
        }
        citysIndex =[e.detail.value,0,0]
        var ssq =cityArray[0][e.detail.value] + list1[0] + list2[0]
        //console.log(ssq)
        that.setData({
          global_sheng:sheng
        });
        break;
      case 1:
        //滑动第二列（市）
        var di;
        var sheng = that.data.global_sheng?that.data.global_sheng:'42';
        //console.log(that.data.global_sheng)
        list1 = cityArray[1];
        for(let i=0, len = arrays.length; i<len; i++){
          if(arrays[i]["name"] == cityArray[1][e.detail.value]){
            di = arrays[i]["di"];
          }
        }
        for(let i=0, len = arrays.length; i<len; i++){
          if(arrays[i]["sheng"] == sheng && arrays[i]["level"] == 3 && arrays[i]["di"] == di){
            list2.push(arrays[i]["name"]);
          }
        }
        citysIndex =[that.data.citysIndex[0],e.detail.value,0];
        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[e.detail.value] + list2[0] + "";
        //console.log(ssq)
        break;
      case 2:
        //滑动第三列 区
        list1 = cityArray[1];
        list2 = cityArray[2];
        citysIndex = [that.data.citysIndex[0],that.data.citysIndex[1],e.detail.value];
        var ssq = cityArray[0][that.data.citysIndex[0]] + list1[that.data.citysIndex[1]] + list2[e.detail.value] + "";
        //console.log(ssq)
        break;
    }
    that.setData({
      "cityArray[1]":list1,//重新赋值第二列数值 即联动了市
      "cityArray[2]":list2,//重新赋值第三列数值 即联动了区
      citysIndex:citysIndex,//更新索引
      ssq:ssq,//获取选中的省市区
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