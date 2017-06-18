//logs.js
var app = getApp();
Page({
  data: {
    logs: []
  },
  onLoad: function () {
    this.setData({
      logs: (wx.getStorageSync('history') || []).map(function (log) {
        return log.name
      })
    })
  }
})
