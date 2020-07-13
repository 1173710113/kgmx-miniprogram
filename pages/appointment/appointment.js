// pages/appointment/appointment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isCreated:false,
    multiArray: [
      ['线上', '线下'],
      ['微信', '电话', '腾讯会议', '企业微信']
    ],
    multiIndex: [0, 0],
    startDate: null,
    startTime: null,
    teacherId:null,
    formData: {
      form:'微信'
    },
    rules: [{
        name: 'name',
        rules: {
          required: true,
          message: '姓名不能为空'
        }
      },
      {
        name: 'job',
        rules: {
          required: true,
          message: '岗位不能为空'
        }
      },
      {
        name: 'zone',
        rules: {
          required: true,
          message: '网点不能为空'
        }
      }
    ]
  },
  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['微信', '电话', '腾讯会议', '企业微信'];
            break;
          case 1:
            data.multiArray[1] = ['分行', '支行'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
    this.setData({
      ['formData.form']:data.multiArray[1][data.multiIndex[1]]
    })
  },

  bindStartDateChange: function (e) {
    this.setData({
      startDate: e.detail.value,
      [`formData.startDate`]: e.detail.value
    })
  },
  bindStartTimeChange: function (e) {
    this.setData({
      startTime: e.detail.value,
      [`formData.startTime`]: e.detail.value
    })
  },
  formInputChange(e) {
    const {
      field
    } = e.currentTarget.dataset
    this.setData({
      [`formData.${field}`]: e.detail.value
    })
  },
  submitForm: function () {
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
        wx.requestSubscribeMessage({
          tmplIds: app.globalData.templateId,
          complete:(res)=>{
            this.appoint()
          }
        })

      }
    })
  },
  appoint:function(){
    var plannedStartDateStr = this.data.startDate + ' ' + this.data.startTime + ':00'
        plannedStartDateStr = plannedStartDateStr.replace(/-/g, "/");
        var plannedStartDate = new Date(plannedStartDateStr)
        var data = {
          name:this.data.formData.name,
          job:this.data.formData.job,
          branch:this.data.formData.zone,
          plannedStartTime:plannedStartDate,
          sessionKey:app.globalData.sessionKey,
          teacherId:this.data.teacherId,
          form:this.data.formData.form
        }
        var url = app.globalData.host + 'appoint/add'
        var method = 'POST'
        app.requestToastLoading(url, data, method)
        app.requestToastLoadingCallback=data=>{
          wx.showToast({
            title: '预约成功',
          })
          this.setData({
            isCreated:true
          })
        }
  },
  back:function(){
    wx.navigateBack({delta:2})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var date = app.getNowFormatDate()
    var time = app.getNowFormatTime()
    console.info(options)
    this.setData({
      startDate: date,
      startTime: time,
      ['formData.startDate']:date,
      ['formData.startTime']:time,
      teacherId:options.id
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