//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    employeeNumber: null,
    userType: null,
    departmentId: null,
    departmentName: null,
    descripton: null,
    level: null,
    isLoading: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    defaultFunction: [{
      url: '/pages/bindEmployeeNum/bindEmployeeNum',
      text: '绑定工号',
      image: '/images/ic_picture_in_picture_black_48dp.png'
    }],
    userTypeFunction: [{
      url: '/pages/bindUserType/bindUserType',
      text: '绑定角色',
      image: '/images/ic_account_box_black_48dp.png'
    }],
    userDepartmentFunction: [{
      url: '/pages/bindDepartment/bindDepartment',
      text: '绑定行部',
      image: '/images/ic_account_balance_black_48dp.png'
    }, ],
    userFunction: {
      student: [
        {
          url: '/pages/addCourseList/addCourseList',
          text: '财富学院',
          image: '/images/ic_add_circle_outline_black_48dp.png'
        },
        {
          url: '/pages/oneToOneTeacherList/oneToOneTeacherList',
          text: '名师在线',
          image: '/images/ic_group_add_black_48dp.png'
        }
      ],
      admin: [{
          url: '/pages/allStudent/allStudent',
          text: '学生管理',
          image: '/images/ic_person_outline_black_48dp.png'
        },
        {
          url: '/pages/allTeacher/allTeacher',
          text: '教师管理',
          image: '/images/ic_school_black_48dp.png'
        }
      ],
      lecturer: [{
          url: '/pages/addCourseForm/addCourseForm',
          text: '财富学院',
          image: '/images/ic_add_circle_outline_black_48dp.png'
        },
        {
          url: '/pages/oneToOneTeacherList/oneToOneTeacherList',
          text: '名师在线',
          image: '/images/ic_group_add_black_48dp.png'
        }
      ]
    },
    userTypeMap: {
      student: '学生',
      admin: '管理员',
      lecturer: '讲师'
    }
  },
  file: function () {
    wx.showLoading()
    wx.downloadFile({
      url: app.globalData.host + 'file/excel',
      success: (res) => {
        wx.openDocument({
          showMenu:true,
          filePath: res.tempFilePath,
          fileType: 'xlsx',
        })
      },
      fail:(res)=>{
        wx.showToast({
          title: '请求失败',
          icon:'none'
        })
      },
      complete:(res)=>{
        wx.hideLoading()
      }
    })
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  navigate: function () {
    var userType = this.data.userType
    if (userType && userType == 'lecturer') {
      wx.navigateTo({
        url: '/pages/bindDescription/bindDescription',
      })
    }
  },
  onLoad: function () {
    this.setData({
      employeeNumber: app.globalData.employeeNumber,
      userType: app.globalData.userType,
      departmentId: app.globalData.departmentId,
      departmentName: app.globalData.departmentName,
      description: app.globalData.description,
      level: app.globalData.level,
      userInfo: app.globalData.userInfo
    })
    app.getUserExtraInfoCallback = res => {
        this.setData({
          employeeNumber: app.isUndefined(res.result.employeeNumber),
          userType: app.isUndefined(res.result.type),
          departmentId: app.isUndefined(res.result.departmentId),
          departmentName: app.isUndefined(res.result.departmentName),
          description: app.isUndefined(res.result.brief),
          level: app.isUndefined(res.result.level),
          userInfo: app.isUndefined(res.result.userInfo)
        })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo
      // 所以此处加入 callback 以防止这种情况 是网络请求，可能会在 Page.onLoad 之后才返回
      app.userInfoReadyCallback = res => {
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          this.setData({
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow: function () {
    this.setData({
      employeeNumber: app.globalData.employeeNumber,
      userType: app.globalData.userType,
      departmentId: app.globalData.departmentId,
      departmentName: app.globalData.departmentName,
      description: app.globalData.description,
      level: app.globalData.level,
      userInfo: app.globalData.userInfo
    })
    var type = this.data.userType
    if (type && (type == 'student' || type == 'lecturer')) {
      wx.showTabBar()
    }
  },
  onPullDownRefresh: function () {
    if (!this.data.isLoading) {
      this.setData({
        isLoading: true
      })
      wx.startPullDownRefresh()
      app.login()
      app.getUserExtraInfoCallback = res => {
        this.setData({
          employeeNumber: app.globalData.employeeNumber,
          userType: app.globalData.userType,
          departmentId: app.globalData.departmentId,
          departmentName: app.globalData.departmentName,
          description: app.globalData.description,
          level: app.globalData.level,
          userInfo: app.globalData.userInfo
        })
        this.setData({
          isLoading: false
        })
      }
      app.loginCompleteCallback = res => {
        wx.stopPullDownRefresh()
      }

    }
  },

  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    app.login()
  },
  changeNickName: function () {
    wx.navigateTo({
      url: '/pages/changeNickName/changeNickName',
    })
  },
  uploadAvatar: function () {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: (res) => {
        console.info(res)
        var filePath = res.tempFilePaths[0]
        wx.uploadFile({
          filePath: filePath,
          name: 'file',
          url: app.globalData.host + 'file/upload/avatar',
          formData: {
            sessionKey: app.globalData.sessionKey
          },
          header: {
            "Content-Type": "multipart/form-data"
          },

          success: (res) => {
            var data = JSON.parse(res.data)
            console.info(data.result)
            this.setData({
              ['userInfo.avatarUrl']: data.result
            })
          }
        })
      },
      complete: (res) => {},
    })
  }
})