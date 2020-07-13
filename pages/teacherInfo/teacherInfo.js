// pages/teacherInfo/teacherInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:null,
    teacherId:null,
    type:null,
    userTypeMap: {
      student: '学生',
      admin: '管理员',
      lecturer: '讲师'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    this.setData({
      teacherId:options.id,
      type:app.globalData.userType
    })
    this.getTeacher()
  },

  getTeacher:function(){
    var url = app.globalData.host + 'user/query/teacher'
    var data = { sessionKey:app.globalData.sessionKey, id:this.data.teacherId}
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback=res=>{
    this.setData({
      teacher:res.result
    })
    }
  },
  gotoAppointment:function(){
    wx.navigateTo({
      url: '/pages/appointment/appointment?id='+  this.data.teacherId,
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