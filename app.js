//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    wx.hideTabBar()
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    this.login()
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  login:function(){
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.getUserInfo({
          success: info_res => {
            var url =  this.globalData.host + 'user/wx/login'
            var data = {
              code: res.code, //临时登录凭证
              rawData: info_res.rawData, //用户非敏感信息
              signature: info_res.signature, //签名
              encrypteData: info_res.encryptedData, //用户敏感信息
              iv: info_res.iv //解密算法的向量
            }
            var method = 'POST'
            this.requestToastLoading(url, data, method)
            this.requestToastLoadingCallback=res=>{
              this.globalData.sessionKey = this.isUndefined(res.result.sessionKey)
              this.globalData.employeeNumber = this.isUndefined(res.result.employeeNumber)
              this.globalData.userType = this.isUndefined(res.result.type)
              this.globalData.departmentId = this.isUndefined(res.result.departmentId)
              this.globalData.departmentName = this.isUndefined(res.result.departmentName)
              this.globalData.description = this.isUndefined(res.result.brief)
              this.globalData.level = this.isUndefined(res.result.level)
              this.globalData.userInfo = this.isUndefined(res.result.userInfo)
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              var type = res.result.type
              if(type && (type=='student' || type=='lecturer')){
                wx.showTabBar({
                  animation: true,
                })
              }
              if (this.getUserExtraInfoCallback) {
                this.getUserExtraInfoCallback(res)
              }
            }
            this.requestToastLoadingCompleteCallback=res=>{
              if(this.loginCompleteCallback){
                this.loginCompleteCallback(res)
              }
            }
          }
        })
      }
    })
  },
  isUndefined:function(data){
    if(typeof(data) == "undefined"){
      console.info("undefined")
      return null
    } 
    return data
  },
  globalData: {
    host: 'https://www.cmbkgmx.cn/wxminip/',
    userInfo: null,
    employeeNumber: null,
    userType: null,
    sessionKey: null,
    departmentId:null,
    departmentName:null,
    description:null,
    level:null,
    isRefresh:false,
    templateId:['xfBl-8MX4UdX38zMZ_8IvGxIN22oVsowzPTh0uF1-B0']
  },
  requestNaviBarLoading:function(url, data, method){
    wx.showNavigationBarLoading()
    wx.request({
      url: url,
      method:method,
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:data,
      success:(res)=>{
        var data = res.data
        if(data.flag){
          if(this.requestNaviBarLoadingCallback){
            this.requestNaviBarLoadingCallback(data)
          }
        } else {
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      },
      complete:(res)=>{
        wx.hideNavigationBarLoading()
        if(this.requestNaviBarLoadingCompleteCallback){
          this.requestNaviBarLoadingCompleteCallback(res)
        }
      }
    })
  },
  requestToastLoading:function(url, data, method){
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: url,
      method:method,
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:data,
      success:(res)=>{
        var data = res.data
        wx.hideLoading()
        if(data.flag){
          if(this.requestToastLoadingCallback){
            this.requestToastLoadingCallback(data)
          }
        } else {
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.hideLoading()
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      },
      complete:(res)=>{
        if(this.requestToastLoadingCompleteCallback){
          this.requestToastLoadingCompleteCallback(res)
        }
      }
    })
  },
  getNowFormatDate:function() {
    var date = new Date();
    var seperator1 = "-";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    return currentdate;
  },
  getNowFormatTime() {
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    var second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    return h + ':' + minute;
  },
})