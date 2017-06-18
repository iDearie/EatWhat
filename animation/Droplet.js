function dropLet (that,options) {
  var option = {
    duration:500,
    timingFunction:'ease-in-out',
    height:100
  }
  var height = option.height;
  var dropLetAnimation = wx.createAnimation({
    duration:500,
    timingFunction: option.timingFunction
  })
  for (var i = option.height; i > 1; i /= 2){
    dropLetAnimation.translateY(height).step();
    dropLetAnimation.translateY(-option.height/2).step()
    option.height = option.height/2
  }
  that.setData({
    dropLetAnimationData:dropLetAnimation
  })
  return dropLetAnimation
}

module.exports = {
  dropLet: dropLet
}