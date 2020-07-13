// pages/myAppointment/myAppointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    unchecked: [],
    agree: [],
    refuse: [],
    tabs: [],
    activeTab: 0,
    scroll_height: null,
    isLoading:false,
    type:null,
    url:{student:'/pages/appointmentInfo/appointmentInfo',lecturer:'/pages/teacherAppointmentInfo/teacherAppointmentInfo'}
  },

  setScrollHeight: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    let ratio = 750 / windowWidth;
    this.setData({
      scroll_height: (windowHeight - 100) * ratio
    })
  },

  getAppointment: function () {
    this.setData({
      isLoading:true
    })
    var url = app.globalData.host + 'appoint/query/all'
    var method = 'POST'
    var data = {
      sessionKey: app.globalData.sessionKey
    }
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        unchecked:res.result.unchecked,
        agree:res.result.agree,
        refuse:res.result.refuse
      })
    }
    app.requestNaviBarLoadingCompleteCallback=res=>{
      this.setData({
        isLoading:false
      })
      if(this.getAppointmentCallback){
        this.getAppointmentCallback(res)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:app.globalData.userType
    })
    const titles = ['审批中', '已同意', '已拒绝']
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    this.setScrollHeight()
    this.getAppointment()
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