//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    foodList: null,
    userInfo: {},
    foodListHide:true
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
    console.log('onLoad');
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
    var animation = wx.createAnimation({
      duration: 1000,
      timingFunction: 'ease',
    })

    this.animation = animation

    animation.opacity(0);

    this.setData({
      animationData: animation.export()
    })

    setTimeout(function () {
      animation.step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 1000)
  },
  // rotateAndScale: function () {
  //   // 旋转同时放大
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateThenScale: function () {
  //   // 先旋转后放大
  //   this.animation.rotate(45).step()
  //   this.animation.scale(2, 2).step()
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // },
  // rotateAndScaleThenTranslate: function () {
  //   // 先旋转同时放大，然后平移
  //   this.animation.rotate(45).scale(2, 2).step()
  //   this.animation.translate(100, 100).step({ duration: 1000 })
  //   this.setData({
  //     animationData: this.animation.export()
  //   })
  // }
})
