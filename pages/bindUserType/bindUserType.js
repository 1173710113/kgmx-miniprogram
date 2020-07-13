// pages/bindUserType/bindUserType.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    userType: null,
    code:'',
    userTypeMap: {
      student: '学生',
      admin: '管理员',
      lecturer: '讲师'
    },
    formData: {
      radio: 'student'
    },
    rules:[],
    radioItems: [{
        name: '学生',
        value: 'student',
        checked: true
      },
      {
        name: '讲师',
        value: 'lecturer'
      },
      {
        name: '管理员',
        value: 'admin'
      }
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      userType: app.globalData.userType
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

  },
  radioChange: function (e) {
    console.log('radio发生change事件，携带value值为：', e.detail.value);

    var radioItems = this.data.radioItems;
    for (var i = 0, len = radioItems.length; i < len; ++i) {
      radioItems[i].checked = radioItems[i].value == e.detail.value;
    }

    this.setData({
      radioItems: radioItems,
      [`formData.radio`]: e.detail.value
    });
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
    wx.showLoading()
    wx.request({
      url: app.globalData.host + 'user/update/type',
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data: {
        sessionKey: app.globalData.sessionKey,
        type: this.data.formData.radio,
        code: this.data.formData.code?this.data.formData.code:null
      },
      success: (res) => {
        wx.hideLoading()
        if (res.data.flag) {
          app.globalData.userType = this.data.formData.radio
          this.setData({
            userType: this.data.formData.radio
          })
          wx.showToast({
            title: '绑定成功通过'
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon:'none'
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