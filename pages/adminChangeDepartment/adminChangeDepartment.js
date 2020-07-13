// pages/adminChangeDepartment/adminChangeDepartment.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:null,
    departmenttId:null,
    departmentName:null,
    departments: [{
      id: '451520',
      name: '营业部'
    },
    {
      id: '451521',
      name: '开发区'
    },
    {
      id: '451522',
      name: '南岗'
    },
    {
      id: '451523',
      name: '大直'
    },
    {
      id: '451524',
      name: '文化宫'
    },
    {
      id: '451525',
      name: '黄河路'
    },
    {
      id: '451526',
      name: '动力'
    },
    {
      id: '451527',
      name: '和兴'
    },
    {
      id: '451528',
      name: '爱建'
    },
    {
      id: '451529',
      name: '果戈里'
    },
    {
      id: '451530',
      name: '学府'
    },
    {
      id: '451531',
      name: '宣化'
    },
    {
      id: '451532',
      name: '马迭尔'
    },
    {
      id: '451533',
      name: '新阳路'
    },
    {
      id: '451534',
      name: '平房'
    },
    {
      id: '451535',
      name: '香坊'
    },
    {
      id: '451536',
      name: '松北'
    },
    {
      id: '451537',
      name: '太古'
    },
    {
      id: '451538',
      name: '西客站'
    },
    {
      id: '451539',
      name: '会展'
    },
    {
      id: '451542',
      name: '花园街'
    },
    {
      id: '451543',
      name: '群力'
    },
    {
      id: '451547',
      name: '南极街'
    },
    {
      id: '451548',
      name: '上海街'
    },
    {
      id: '451549',
      name: '一曼街'
    },
    {
      id: '451550',
      name: '第五大道'
    },
    {
      id: '451551',
      name: '长江路'
    },
    {
      id: '451552',
      name: '道外'
    },
    {
      id: '451553',
      name: '民生路'
    },
    {
      id: '451554',
      name: '友协大街'
    },
    {
      id: '451555',
      name: '创新城'
    },
    {
      id: '451556',
      name: '博览中心'
    },
    {
      id: '451557',
      name: '大成支行'
    },
    {
      id: '459520',
      name: '大庆营业部'
    },
    {
      id: '459522',
      name: '大庆新村'
    },
    {
      id: '459523',
      name: '大庆乘风'
    },
    {
      id: '300073',
      name: '哈尔滨财富中心'
    },
    {
      id: '300179',
      name: '大庆财富中心'
    },
    {
      id: '300717',
      name: '哈尔滨私人银行'
    },
    {
      id: '300816',
      name: '大庆私人银行'
    }
    ],
    departmentIndex: 0,
  },

  bindCountryChange: function (e) {
    console.log('picker country 发生选择改变，携带值为', e.detail.value);

    this.setData({
      departmentIndex: e.detail.value
    })
  },
  submitForm: function (event) {
    app.globalData.isRefresh=true
    var department = event.currentTarget.dataset.department
    var url = app.globalData.host + 'user/admin/update/department'
    var data = {
      sessionKey: app.globalData.sessionKey,
      departmentId:department.id,
      userId:this.data.id
    }
    var method = 'POST'
    app.requestToastLoading(url,data, method)
    app.requestToastLoadingCallback=res=>{
      this.setData({
        departmentId:department.id,
        departmentName:department.name
      })
    }
  },
  back:function(){
    wx.navigateBack({
      delta:1
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