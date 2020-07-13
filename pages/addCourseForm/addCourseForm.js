// pages/addCourseForm/addCourseForm.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCreated: false,
    startDate: "2016-09-01",
    startTime: "12:01",
    signInDate: "2016-09-01",
    signInTime: "12:01",
    formData: {

    },
    rules: [{
      name: 'courseName',
      rules: [{
        required: true,
        message: '课程名不能为空'
      }, {
        maxlength: 100,
        message: "最大长度为100"
      }]
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = app.getNowFormatDate()
    var time = app.getNowFormatTime()
    this.setData({
      startDate: date,
      signInDate: date,
      startTime: time,
      signInTime: time
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

  },
  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value,
      [`formData.startDate`]: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value,
      [`formData.startTime`]: e.detail.value
    })
  },
  bindSignInDateChange: function (e) {
    this.setData({
      signInDate: e.detail.value,
      [`formData.signInDate`]: e.detail.value
    })
  },
  bindSignInTimeChange: function (e) {
    this.setData({
      signInTime: e.detail.value,
      [`formData.signInTime`]: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        var plannedStartDateStr = this.data.startDate + ' ' + this.data.startTime + ':00'
        plannedStartDateStr = plannedStartDateStr.replace(/-/g, "/");
        var plannedStartDate = new Date(plannedStartDateStr)
        var signInDateStr = this.data.signInDate + ' ' + this.data.signInTime + ':00'
        signInDateStr = signInDateStr.replace(/-/g, "/")
        var signInDate = new Date(signInDateStr)
        var url = app.globalData.host + 'course/add'
        var data = {
          sessionKey: app.globalData.sessionKey,
          courseName: this.data.formData.courseName,
          plannedStartTime: plannedStartDate,
          signInTime: signInDate
        }
        var method='POST'
        app.requestToastLoading(url, data, method)
        app.requestToastLoadingCallback=res=>{
          this.setData({
            isCreated: true
          })
          wx.showToast({
            title: '创建课程成功'
          })
        }
      }
    })
  },
  back:function(){
    wx.navigateBack()
  }
})