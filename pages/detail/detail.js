var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shop:{},
    foodList:[],
    toView: 'classify3',
    shopID:null
  },

  scrollToViewFn: function (e) {
    console.log(e);
    var _id = e.target.dataset.id;
    this.setData({
      toView: 'classify' + _id
    })
  }, 
  bindMakeSure:function () {
    var that = this;
    wx.showModal({
      title: '恭喜',
      content: '==' + this.data.shop.name + '==成功的入了您的法眼',
      cancelText:'店铺位置',
      confirmText:'记录在案',
      success:function (options) {
        if(options.confirm) {
          if(app.globalData.history.indexOf(that.data.shop) === -1){
            app.globalData.history.push(that.data.shop);
            wx.setStorageSync('history', app.globalData.history);
            wx.navigateBack({
              delta:5
            })
          }else {
            wx.showToast({
              title: '这家已经在案了呢，现在就去吧！',
              success:function(){
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }
            })
          }
        };
        if(options.cancel) {
          if (app.globalData.history.indexOf(that.data.shop) === -1) {
            app.globalData.history.push(that.data.shop);
            wx.setStorageSync('history', app.globalData.history);
          }
          wx.openLocation({
            latitude: that.data.shop.latitude,
            longitude: that.data.shop.longitude,
            scale: 28,
            name:that.data.shop.name,
            address:that.data.shop.address
          })
        }
      }
    })
    wx.vibrateLong();
  }, 

  bindBack:function () {
    wx.navigateBack()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      shopID:options.shopID
    })
    var that = this;
    wx.request({
      url: 'https://mainsite-restapi.ele.me/shopping/restaurant/' + options.shopID + '?extras[]=activities&extras[]=albums&extras[]=license&extras[]=identification',
      success:function(res){
        console.log(res);
        that.setData({
          shop:res.data,
          longitude: res.data.longitude,
          latitude: res.data.latitude
        })
        wx.request({
          url: 'https://mainsite-restapi.ele.me/shopping/v2/menu?restaurant_id=' + options.shopID,
          success:function (res) {
            console.log(res);
            that.setData({
              foodList:res.data
            })
          },
          fail:function (err) {
            console.log(err);
          },
          complete:function () {

          }
        })
      },
      fail:function(err){
        console.log(err)
      },
      complete:function(){
        
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