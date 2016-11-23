require("./utils/ald-stat.js");

App({
  systemInfo: null,
  onLaunch() {
    const self = this;
    self.aldstat.debug('launched');
    wx.getSystemInfo({
      success(res) {
        self.systemInfo = res;
        var oldSys = JSON.stringify(wx.getStorageSync('sysInfo'));
        var newSys = JSON.stringify(res)
        if(oldSys !== newSys){
          console.log('sysInfo changed:' , oldSys + '-->' + newSys)
          setTimeout(function(){
            self.aldstat.debug(oldSys + '-->' + newSys)
          }, 0)
        }
        wx.setStorage({
          key: 'sysInfo',
          data: res
        })
      },
    });
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
    userInfo:null
  }
});

var app= getApp()
app.aldstat.debug('app.js')