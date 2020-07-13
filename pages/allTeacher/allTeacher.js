// pages/allTeacher/allTeacher.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:[],
    isLoading:false
  },
  getTeacher:function(){
    var url = app.globalData.host + 'user/query/teacher/all'
    var data = {
      sessionKey:app.globalData.sessionKey
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback=res=>{
      this.setData({
        teacher:res.result
      })
    }
    app.requestNaviBarLoadingCompleteCallback=res=>{
      if(this.getTeacherCallback){
        this.getTeacherCallback(res)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getTeacher()
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
      app.globalData.isRefresh=false
      this.getTeacher()
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
      this.setData({
        isLoading:true
      })
      this.getTeacher()
      this.getTeacherCallback=res=>{
        wx.stopPullDownRefresh()
        this.setData({
          isLoading:false
        })
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