// pages/bindEmployeeNum/bindEmployeeNum.js
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    employeeNumber: null,
    type:null,
    formData: {

    },
    rules: [{
      name: 'employeeNumber',
      rules: {
        required: true,
        message: '工号不能为空'
      },
    }]
  },

  change:function(){
    app.globalData.isRefresh=true
    var id = null
    wx.navigateTo({
      url: '/pages/adminChangeEmployeeNumber/adminChangeEmployeeNumber',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      employeeNumber: app.globalData.employeeNumber,
      type:app.globalData.userType
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
    if(app.globalData.isRefresh){
      app.globalData.isRefresh=false
      this.setData({
        employeeNumber: app.globalData.employeeNumber
      })
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
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm() {
    this.selectComponent('#form').validate((valid, errors) => {
      console.log('valid', valid, errors)
      if (!valid) {
        const firstError = Object.keys(errors)
        if (firstError.length) {
          this.setData({
            error: errors[firstError[0]].message
          })
        }
      } else {
        wx.showLoading()
        wx.request({
          url: app.globalData.host + 'user/update/employeenumber',
          method:'POST',
          header:{
            'content-type': 'application/x-www-form-urlencoded'
          },
          data:{
            sessionKey:app.globalData.sessionKey,
            employeeNumber:this.data.formData.employeeNumber
          },
          success:(res)=>{
            wx.hideLoading()
            if(res.data.flag){
              app.globalData.employeeNumber = this.data.formData.employeeNumber
              this.setData({
                employeeNumber:this.data.formData.employeeNumber
              })
              wx.showToast({
                title: '绑定成功通过'
              })
            } else {
              wx.showToast({
                title:res.data.msg,
                icon:"none"
              })
            }
          },
          fail:(res)=>{
            wx.hideLoading()
            wx.showToast({
              title: '网络请求失败',
              icon:"none"
            })
          }
        })
      }
    })
  }
})