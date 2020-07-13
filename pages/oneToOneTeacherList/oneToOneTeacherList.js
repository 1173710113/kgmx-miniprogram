// pages/oneToOneTeacherList/oneToOneTeacherList.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    teacher:[],
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
    this.getTeacher()
  },

  getTeacher:function(){
    wx.showNavigationBarLoading()
    wx.request({
      url: app.globalData.host + 'user/query/teacher/all',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        sessionKey:app.globalData.sessionKey
      },
      success:(res)=>{
        wx.hideNavigationBarLoading()
        var data = res.data
        if(data.flag){
          this.setData({
            teacher:data.result
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.hideNavigationBarLoading()
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      }
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