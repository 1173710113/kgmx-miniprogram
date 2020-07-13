// pages/teacherAppointmentInfo/teacherAppointmentInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    appointmentId: null,
    appointment: null,
    student: null,
    teacher: null,
    stateMap: {
      unchecked: '审核中',
      agree: '已同意',
      refuse: '已拒绝'
    },
    isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      appointmentId: options.id
    })
    this.getAppointment()
  },

  getAppointment: function () {
    this.setData({isLoading:true})
    var url = app.globalData.host + 'appoint/query'
    var data = {
      sessionKey: app.globalData.sessionKey,
      appointmentId: this.data.appointmentId
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        appointment: res.result.appointment,
        student: res.result.student,
        teacher: res.result.teacher,
        isLoading:false,
      })
      if(this.getAppointmentCallback){
        this.getAppointmentCallback(res)
      }
    }
  },

  agree:function(){
    app.globalData.isRefresh=true
    wx.navigateTo({
      url: '/pages/agreeAppointment/agreeAppointment?id=' + this.data.appointmentId,
    })
  },

  refuse: function () {
    app.globalData.isRefresh=true
    var url = app.globalData.host + 'appoint/refuse'
    var data = {
      sessionKey: app.globalData.sessionKey,
      appointmentId: this.data.appointmentId
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback=res=>{
      wx.showToast({
        title: '已拒绝',
      })
      this.getAppointment()
    }
  },

  startOrEnd:function(){
    var type = this.data.appointment.startTime?'end':'start'
    var url = app.globalData.host + 'appoint/' + type
    var data = {
      sessionKey:app.globalData.sessionKey,
      appointmentId: this.data.appointmentId
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback=res=>{
      this.setData({
        appointment:res.result.appointment
      })
    }
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
    if(app.globalData.isRefresh){
      this.getAppointment()
    }
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
    if(!this.data.isLoading){
      wx.startPullDownRefresh()
      this.getAppointment()
      this.getAppointmentCallback=res=>{
        wx.stopPullDownRefresh()
      }
    }
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