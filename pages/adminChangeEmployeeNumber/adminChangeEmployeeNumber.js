// pages/adminChangeEmployeeNumber/adminChangeEmployeeNumber.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    employeeNumber: null,
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

  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },

  back:function(){
    wx.navigateBack({
      delta:1
    })
  },

  submitForm() {
    app.globalData.isRefresh = true 
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
        var url = app.globalData.host + 'user/admin/update/employeenumber'
        var data = {
          sessionKey:app.globalData.sessionKey,
          employeeNumber:this.data.formData.employeeNumber
        }
        if(this.data.id){
          data.userId=this.data.id
        }
        var method = 'POST'
        app.requestToastLoading(url, data, method)
        app.requestToastLoadingCallback=res=>{
          this.setData({
            employeeNumber:this.data.formData.employeeNumber
          })
          if(!this.data.id){
            app.globalData.employeeNumber=this.data.formData.employeeNumber
          }
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      id:options.id
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