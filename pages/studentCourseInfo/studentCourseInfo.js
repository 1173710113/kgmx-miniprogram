// pages/studentCourseInfo/studentCourseInfo.js

const app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    courseId:null,
    course:null,
    isLoading:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      courseId:options.courseId
    })
    this.getCourse()
  },

  getCourse:function(){
    this.setData({
      isLoading:true
    })
    var url =  app.globalData.host + 'course/query/course/student'
    var data = {
      sessionKey: app.globalData.sessionKey,
        courseId: this.data.courseId
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback=res=>{
      this.setData({
        course:res.result
      })
    }
    app.requestNaviBarLoadingCompleteCallback=res=>{
      this.setData({
        isLoading:false
      })
      if(this.getCourseCallback){
        this.getCourseCallback(res)
      }
    }
  },
  submit:function(){
    wx.requestSubscribeMessage({
      tmplIds: app.globalData.templateId,
      complete:(res)=>{
       wx.showToast({
         title: '操作成功',
       })
      }
    })
  },
  enrollOrDropCourse: function (e) {
    app.globalData.isRefresh = true
    var course = this.data.course
    var flag = course.flag
    wx.showLoading({
      title: '请求中',
    })
    var append = flag ? 'drop' : 'enroll'
    var url = app.globalData.host + 'course/' + append
    var data = {
      sessionKey: app.globalData.sessionKey,
      courseId: course.id
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback=res=>{
      this.setData({
        ["course.flag"]:!flag,
        ["course.count"]:flag?course.count-1:course.count+1
      })
    }
  },

  signIn:function(e){
    var url = app.globalData.host + '/course/signin'
    var data = {
      sessionKey: app.globalData.sessionKey,
        courseId:this.data.courseId
    }
    var method = 'POST'
    app.requestToastLoading(url,data,method)
    app.requestToastLoadingCallback=res=>{
      wx.showToast({
        title: '签到成功',
      })
      this.setData({
        course:res.result
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
      this.getCourse()
      this.getCourseCallback=res=>{
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