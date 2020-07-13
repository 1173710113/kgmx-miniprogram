// pages/course/course.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    course: [],
    tabs: [],
    activeTab: 0,
    scroll_height: null,
    courseNotStart: [],
    courseIng: [],
    courseEnd: [],
    isLoading: false,
    type: null,
    url: {
      student: '/pages/studentCourseInfo/studentCourseInfo',
      lecturer: '/pages/courseInfo/courseInfo'
    },
    postUrl: {
      student: 'course/query/student/subscribe',
      lecturer: 'course/query/user'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type: app.globalData.userType
    })
    const titles = ['未开始', '进行中', '已结束']
    const tabs = titles.map(item => ({
      title: item
    }))
    this.setData({
      tabs
    })
    this.setScrollHeight()
    if (this.data.type) {
      this.getCourse()
    }
  },
  setScrollHeight: function () {
    let windowHeight = wx.getSystemInfoSync().windowHeight // 屏幕的高度
    let windowWidth = wx.getSystemInfoSync().windowWidth // 屏幕的宽度
    let ratio = 750 / windowWidth;
    this.setData({
      scroll_height: (windowHeight - 100) * ratio
    })
  },

  getCourse: function () {
    this.setData({
      isLoading: true
    })
    var url = app.globalData.host + this.data.postUrl[this.data.type]
    var data = {
      sessionKey: app.globalData.sessionKey
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        courseNotStart: res.result['notStart'],
        courseIng: res.result['ing'],
        courseEnd: res.result['end']
      })
    }
    app.requestNaviBarLoadingCompleteCallback = res => {
      this.setData({
        isLoading: false
      })
      if (this.getCourseCallback) {
        this.getCourseCallback(res)
      }
    }
  },
  onTabCLick(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
    })
  },

  onChange(e) {
    const index = e.detail.index
    this.setData({
      activeTab: index
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
    if (!this.data.isLoading && this.data.type) {
      wx.startPullDownRefresh({
        complete: (res) => {},
      })
      this.getCourse()
      this.getCourseCallback = res => {
        wx.stopPullDownRefresh({
          complete: (res) => {},
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