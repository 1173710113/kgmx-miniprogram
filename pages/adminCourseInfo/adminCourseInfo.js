// pages/adminCourseInfo/adminCourseInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: null,
    student: [],
    isLoading: false,
    courseId: null,
  },
  getStudent() {
    var url = app.globalData.host + 'course/query/student'
    var data = {
      sessionKey: app.globalData.sessionKey,
      courseId: this.data.courseId
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        student: res.result,
        isLoading: false
      })
      if (this.getStudentCallback) {
        this.getStudentCallback(res)
      }
    }
  },

  getCourse() {
    this.setData({
      isLoading: true
    })
    var url = app.globalData.host + 'course/query'
    var data = {
      sessionKey: app.globalData.sessionKey,
      courseId: this.data.courseId
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        course: res.result
      })
      this.getStudent()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId: options.courseId
    })
    this.getCourse()
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