import api from '../../http/api'
import pinyin from '../../lib/pinyin/index'
// const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    List: [],
    actived: '疫情地图',
    navList: ['疫情地图', '最新消息', '辟谣消息', '疫情趋势'],
    data: ''
  },
  changePage(e) {
    wx.setNavigationBarTitle({
      title: e.currentTarget.dataset.page,
    });
    this.setData({
      actived: e.currentTarget.dataset.page
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    api.getChart().then(res => {
      if (res.errcode === 0) {
        this.setData({
          data: res.data
        })
        this.getData(res.data.history)
      }
    })
  },
  getPosition() {
    if (val !== '全国') {
      chartSettings.value.position = 'province/' + pinyin.getFullChars(val).toLowerCase()
    }
  },
  getData(history) {
    let temp = {},
      date = [],
      confirmedList = [],
      suspectedList = [],
      deathsList = [],
      curesList = []
    history.map(item => {
      date.unshift(item.date)
      confirmedList.unshift(item.confirmedNum)
      suspectedList.unshift(item.suspectedNum)
      deathsList.unshift(item.deathsNum)
      curesList.unshift(item.curesNum)
    })
    temp = {
      date: date,
      confirmedList: confirmedList,
      suspectedList: suspectedList,
      deathsList: deathsList,
      curesList: curesList
    }
    console.log(temp);
    this.setData({
      List: temp
    })
    if (this.data.actived === '疫情趋势') {
      setTimeout(() => {
        this.qushi()
      }, 500)
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log(pinyin.getFullChars('管理员'));
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