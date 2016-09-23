var Promise = require('bluebird')
var sha1 = require('sha1')
var _ = require('lodash')
// var enGbk = require('liveinjs-gbk')

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
