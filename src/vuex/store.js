import Vue from 'vue'
import Vuex from 'vuex'
import Promise from 'bluebird'

// 创建一个对象来保存应用启动时的初始状态
const state = {
  basicData: {},
  chooseImageFn: function () {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            resolve(res) // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          }
      })
    })
  },
  previewImageFn: function () {
    return new Promise((resolve, reject) => {
      wx.previewImage({
          current: '', // 当前显示图片的http链接
          urls: [] // 需要预览的图片http链接列表
      })
    })
  },
  uploadImageFn: function (localId) {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
          localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
          isShowProgressTips: 1, // 默认为1，显示进度提示
          success: function (res) {
            resolve(res) // 返回图片的服务器端ID
          }
      })
    })
  },
}

// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  INCREMENT (state, data) {
    state.basicData = data
  }
}

// 整合初始状态和变更函数，我们就得到了我们所需的 store
// 至此，这个 store 就可以连接到我们的应用中
export default new Vuex.Store({
  state,
  mutations
})
