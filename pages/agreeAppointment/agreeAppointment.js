// pages/agreeAppointment/agreeAppointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId: null,
    isCreated: false,
    startDate: "2016-09-01",
    startTime: "12:01",
    signInDate: "2016-09-01",
    signInTime: "12:01",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      appointmentId:options.id
    })
    this.getAppointment()
    var date = app.getNowFormatDate()
    var time = app.getNowFormatTime()
    this.setData({
      signInDate: date,
      signInTime: time
    })
  },

  getAppointment:function(){
    var url = app.globalData.host + 'appoint/query'
    var data = {
      sessionKey: app.globalData.sessionKey,
      appointmentId: this.data.appointmentId
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      var dateStr = res.result.appointment.plannedStartTime
      dateStr = dateStr.replace(/-/g, "/");
      var date = new Date(dateStr)
      var seperator1 = "-";
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
      var currentdate = y + seperator1 + m + seperator1 + d;
      var currentTime = h + ":" + minute
      this.setData({
        startDate:currentdate,
        startTime:currentTime
      })
    }
  },

  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value,
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value,
    })
  },
  bindSignInDateChange: function (e) {
    this.setData({
      signInDate: e.detail.value,
    })
  },
  bindSignInTimeChange: function (e) {
    this.setData({
      signInTime: e.detail.value,
    })
  },
  submitForm() {
    var plannedStartDateStr = this.data.startDate + ' ' + this.data.startTime + ':00'
    plannedStartDateStr = plannedStartDateStr.replace(/-/g, "/");
    var plannedStartDate = new Date(plannedStartDateStr)
    var signInDateStr = this.data.signInDate + ' ' + this.data.signInTime + ':00'
    signInDateStr = signInDateStr.replace(/-/g, "/")
    var signInDate = new Date(signInDateStr)
    var url = app.globalData.host + 'appoint/agree'
    var data = {
      sessionKey: app.globalData.sessionKey,
      appointmentId:this.data.appointmentId,
      plannedStartTime: plannedStartDate,
      signInTime: signInDate
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback = res => {
      this.setData({
        isCreated: true
      })
      wx.showToast({
        title: '创建课程成功'
      })
    }
  },
  back:function(){
    app.globalData.isRefresh=true
    wx.navigateBack({
     delta:1
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