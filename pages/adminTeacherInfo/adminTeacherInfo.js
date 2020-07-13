// pages/adminTeacherInfo/adminTeacherInfo.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: null,
    teacher: null,
    course: [],
    showActionsheet: false,
    showLevelActionsheet: false,
    groups: [{
        text: '更改工号',
        value: 1
      },
      {
        text: '更改等级',
        value: 2
      },
      {
        text: '更改角色',
        type: 'warn',
        value: 3
      }
    ],
    isLoading:false,
    levelGroups: [{
      text: '金牌',
      value: 1
    },
    {
      text: '银牌',
      value: 2
    },
    {
      text: '铜牌',
      value: 3
    }
  ]
  },
  close: function () {
    this.setData({
      showActionsheet: false
    })
  },
  btnClick(e) {
    app.globalData.isRefresh=true
    console.log(e.detail.value)
    if(e.detail.value == 2){
      this.setData({
        showLevelActionsheet:true
      })
    } else if(e.detail.value == 1){
      wx.navigateTo({
        url: '/pages/adminChangeEmployeeNumber/adminChangeEmployeeNumber?id='+this.data.id,
      })
    }
    this.close()
  },

  levelBtnClick(e){
    console.log(this.data.levelGroups[e.detail.index].text)
    this.setData({
      showLevelActionsheet:false
    })
    this.updateLevel(this.data.levelGroups[e.detail.index].text)
  },

  updateLevel:function(level){
    var url = app.globalData.host + 'user/update/level'
    var data = {
      sessionKey:app.globalData.sessionKey,
      teacherId:this.data.id,
      level:level
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback=res=>{
      this.setData({
        teacher:res.result
      })
    }
  },

  edit:function(){
    this.setData({
      showActionsheet: true
    })
  },

  getTeacher: function () {
    var url = app.globalData.host + 'user/query/teacher'
    var data = {
      sessionKey: app.globalData.sessionKey,
      id: this.data.id
    }
    var method = 'POST'
    app.requestToastLoading(url, data, method)
    app.requestToastLoadingCallback = res => {
      this.setData({
        teacher: res.result
      })
      this.getCourse()
    }
  },

  getCourse: function () {
    var url = app.globalData.host + 'course/query/teacher'
    var data = {
      sessionKey: app.globalData.sessionKey,
      teacherId: this.data.id
    }
    var method = 'POST'
    app.requestNaviBarLoading(url, data, method)
    app.requestNaviBarLoadingCallback = res => {
      this.setData({
        course: res.result
      })
    }
    app.requestNaviBarLoadingCompleteCallback=res=>{
      if(this.getCourseCallback){
        this.getCourseCallback(res)
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
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
      this.setData({
        isLoading:true
      })
      wx.startPullDownRefresh()
      this.getTeacher()
      this.getCourseCallback=res=>{
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