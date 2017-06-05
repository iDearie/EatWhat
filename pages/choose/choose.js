// pages/choose/choose.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    foodList:[],
    positionX:null,
    positionY:null,
    food:'',
    _foodList:[],
    animationData: {},
    stop:true,
    timer:null,
    stopTimer:null,
    showNear:null,
    shopId:null,
    foodId:null
  },
  stopRandom:function(){
    var that = this;
    clearInterval(that.data.timer);
    that.setData({
      stop:!that.data.stop
    });
    that.data.stopTimer = setInterval(function(){
      if(that.data._foodList.length){
        that.data._foodList.shift();
        that.setData({
          _foodList: that.data._foodList
        })
      }else {
        clearInterval(that.data.stopTimer);
      }
    },50)
  },
  startRandom:function(){
    var that = this;
    var foodId;
    clearInterval(that.data.timer);
    that.setData({
      stop:!that.data.stop
    })
    this.data.timer = setInterval(function(){
      foodId = parseInt(Math.random() * that.data.foodList.length - 2);
      that.data._foodList.push({
        posX: parseInt(Math.random() * 300),
        posY: parseInt(Math.random() * 700),
        food: that.data.foodList[foodId],
        animation:that.animation
      });
      that.setData({
        _foodList:that.data._foodList,
        food: that.data.foodList[foodId],
        foodId:foodId
      })
      if(that.data._foodList.length > 20){
        that.data._foodList.shift();
      }
    },50)
  },
  showDetail:function () {
    var that = this;
    wx.navigateTo({
      url: '../detail/detail?shopID=' + app.globalData.shopIdList[that.data.foodId],
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var animation = wx.createAnimation({
      duration: 500,
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({
      foodList: app.globalData.foodList.split('；'),
      showNear:app.globalData.showNear
    });
    this.startRandom();
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