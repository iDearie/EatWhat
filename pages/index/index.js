//index.js
var animationstore = require('../../animation/animation.js');
//获取应用实例
var app = getApp()
Page({
  data: {
    foodList: null,
    userInfo: {},
    foodListHide:true,
    timer:null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  bindViewChoose:function(){
    wx.navigateTo({
      url: '../choose/choose',
    })
  },
  bindCutFoodList:function (){
    this.setData({
      foodListHide: !this.data.foodListHide
    })
  },
  bindShowNear:function (){
    var that = this;
    wx.showModal({
      title: '确定要用附近的美食替换当前选单么',
      success: function (res) {
        if (res.confirm) {
          that.setData({
            foodList:'',
          });
          wx.showLoading({
            title: '正在获取中...',
            success:function(){
              wx.getLocation({
                success: function(res) {
                  console.log(res);
                  wx.request({
                    url: 'https://mainsite-restapi.ele.me/shopping/restaurants?extras[]=activities&geohash=wx4gpq1s12h&latitude='+res.latitude+'&limit=40&longitude='+res.longitude+'&offset=0',
                    success:function(res){
                      app.globalData.showNear = !app.globalData.showNear
                      res.data.map(function(index){
                        that.setData({
                          foodList:that.data.foodList + index.name +'；'
                        });
                        app.globalData.shopIdList.push(index.id);
                      });
                      that.bindCutFoodList();
                      app.globalData.foodList = that.data.foodList;
                      
                    },
                    fail:function(err){
                      console.log(err)
                    },
                    complete:function(){
                      wx.hideLoading();
                    }
                  })
                },
              })
            }
          })
        } else if (res.cancel) {
          wx.showToast({
            title: '没有获取附近的美食呢...',
          })
        }
      }
    })
  },
  onLoad: function () {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      console.log(userInfo);
      //更新数据
      that.setData({
        userInfo:userInfo,
        foodList:app.globalData.foodList
      })
    })
  },
  onShow: function () {
    var that = this;
    var tipAnimation = wx.createAnimation({
      duration: 500,
      timingFunction: 'ease'
    })
    this.data.timer = setTimeout(function () {
      tipAnimation.translateX(20).translateY(-10).step()
        .translateY(10).step()
        .translateX(-20).step()
        .translateY(-10).step()
        .translateX(0).translateY(0).step();
      that.setData({
        tipAnimationData: tipAnimation.export()
      })
    },5000)

    animationstore.dropLet(that);
    
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })
    animation.scale(2, 2).step()

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.opacity(1).scale(1, 1).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
})
