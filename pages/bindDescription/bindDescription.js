// pages/bindDescription/bindDescription.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    description:'',
  },
  bindInputChange:function(e){
    this.setData({
      description:e.detail.value
    })
  },

  submit:function(){
    wx.showLoading({
      title: '请求中',
    })
    wx.request({
      url: app.globalData.host + 'user/update/description',
      method:'POST',
      header:{
        'content-type':'application/x-www-form-urlencoded'
      },
      data:{
        sessionKey: app.globalData.sessionKey,
        description:this.data.description
      },
      success:(res)=>{
        wx.hideLoading({
          complete: (res) => {},
        })
        var data = res.data
        if(data.flag){
          app.globalData.description=this.data.description
          wx.showToast({
            title: '修改成功',
          })
        } else {
          wx.showToast({
            title: data.msg,
            icon:'none'
          })
        }
      },
      fail:(res)=>{
        wx.hideLoading({
          complete: (res) => {},
        })
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      description:app.globalData.description
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