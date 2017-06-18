//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    this.globalData.history = wx.getStorageSync('history') || [];
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    foodList:'盖浇饭；砂锅；大排档；米线；满汉全席；西餐；麻辣烫；自助餐；炒面；快餐；水果；西北风；馄饨；火锅；烧烤；泡面；速冻水饺；日本料理；涮羊肉；味千拉面；肯德基；面包；扬州炒饭；自助餐；茶餐厅；海底捞；咖啡；比萨；麦当劳；兰州拉面；沙县小吃；烤鱼；海鲜；铁板烧；韩国料理；粥；快餐；东南亚菜；甜点；农家菜；川菜；粤菜；湘菜；本帮菜；竹笋烤肉',
    showNear:false,
    shopIdList:[],
    history:[]
  }
})