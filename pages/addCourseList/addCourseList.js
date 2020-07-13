// pages/addCourse/addCourse.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: [],
    isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    if(app.globalData.isRefresh){
      this.getCourse()
      app.globalData.isRefresh=false
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
      wx.startPullDownRefresh({
        complete: (res) => {},
      })
      this.getCourse()
      this.getCourseCallback = res =>{
        wx.stopPullDownRefresh({
          complete: (res) => {},
        })
      }}
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
  getCourse: function () {
    this.setData({
      isLoading:true
    })
    wx.showNavigationBarLoading()
    var url = app.globalData.host + 'course/query/all/student'
    var data = { sessionKey: app.globalData.sessionKey}
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback=res=>{
      this.setData({
        course: res.result
      })
    }
    app.requestNaviBarLoadingCompleteCallback=res=>{
      wx.hideNavigationBarLoading()
      this.setData({
        isLoading:false
      })
      if(this.getCourseCallback){
        this.getCourseCallback(res)
      }
    }
  }
})