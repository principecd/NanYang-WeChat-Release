var Promise = require('bluebird')
var sha1 = require('sha1')
var _ = require('lodash')
// var enGbk = require('liveinjs-gbk')

// var basicUrl = 'http://wechatordering.ngrok.cc'
var basicUrl = 'http://www.hzts.com.cn:8088/rcjk'


function init () {
  var now = Date.now()
  var signature = ['NaRcJk4WeChat', now, '123332'].sort().join('')
  var timestamp = now
  var nonce = '123332'

  return {
    signature: sha1(signature),
    timestamp: timestamp,
    nonce: nonce
  }
}

module.exports = {
  basicUrl: basicUrl,
  chooseImage() {
    return new Promise((resolve, reject) => {
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          let localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          console.log('localIds:', res)
          resolve(localIds[0])
        }
      })
    })
  },
  uploadImage (localId) {
    return new Promise((resolve, reject) => {
      wx.uploadImage({
        localId: localId, // 需要上传的图片的本地ID，由chooseImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          let serverId = res.serverId; // 返回图片的服务器端ID
          console.log('serverId:', res)
          resolve(serverId)
        }
      })
    })
  },
  delete () {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.assignIn(data, query, user)
      url = basicUrl + url
      $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.post(url, data).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  getEnum(user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.extend(data, query, user)
      url = basicUrl + url
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
    })
  },
  post (user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.assignIn(data, query, user)
      url = basicUrl + url
      $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.post(url, data).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  get (user, query, url) {
    return new Promise((resolve, reject) => {
      var data = init()
      data = _.extend(data, query, user)

      // url = url + '?'
      // Object.keys(data).forEach(key => {
      //   url = `${url}${key}=${data[key]}&`
      // })
      url = basicUrl + url
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
      // Vue.http.get(url).then((res) => {
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //   // console.log(res)
      //   resolve(res.body)
      // }, errorCallback)
    })
  },
  postFile(user, query, wcMediaId, url) {
    return new Promise((resolve, reject) => {
      var data = init()

      data = _.extend(data, query, user)
      data.wcMediaId = wcMediaId
      url = basicUrl + url + '?'

      Object.keys(data).forEach(key => {
        url = url + key + '=' + data[key] + '&'
      })

      $.ajax({
        type: 'post',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res)
      })
    })
  },
  getOptions (dictCode) {
    return new Promise((resolve, reject) => {
      var url = basicUrl + '/corej2ee/utils/dict/all'

      // url = url + '?'
      var data = init()
      data.dictCode = dictCode

      // Object.keys(data).forEach(key => {
      //   url = `${url}${key}=${data[key]}&`
      // })
      // console.log('get:', data)
      $.ajax({
        type: 'get',
        url: url,
        data: data,
        dataType: 'json',
        beforeSend: function (xhr) {
          xhr.overrideMimeType('text/html;charset=GBK')
        }
      })
      .done(res => {
        resolve(res.datas)
      })
      // Vue.http.get(url).then((res) => {
      //   // if (res.body !== 'string') {
      //   //   res.body = JSON.stringify(res.body)
      //   //   if (charset === 'UTF-8') {
      //   //     res.body = gbk.toString('utf-8', res.body)
      //   //   }
      //   //   console.log(res.body)
      //   // }
      //
      //   if (res.body !== 'object') {
      //     res.body = JSON.parse(res.body)
      //   }
      //   resolve(res.body.datas)
      // }, errorCallback)
    })
  }
}
